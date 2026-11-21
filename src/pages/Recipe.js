import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetchRecipe from "../hooks/useFetchRecipe";
import LoadIcon from "../img/icon/loading.gif";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CookingTimer from "../components/CookingTimer";
import { useFavorites } from "../context/FavoritesContext";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, isError } = useFetchRecipe(id);
  const { isFavorite, toggleFavorite, showToast } = useFavorites();

  const [servings, setServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (recipe?.servings) {
      setServings(recipe.servings);
    }
  }, [recipe?.servings]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-cool flex flex-col justify-between">
        <NavBar />
        <div className="flex flex-col items-center justify-center py-32">
          <img src={LoadIcon} alt="Loading" className="w-16 h-16 mb-4 animate-spin-slow" />
          <p className="text-neutral-600 font-display font-medium text-lg">
            Preparing your recipe card...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-cool flex flex-col justify-between">
        <NavBar />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="bg-white border border-red-100 rounded-3xl p-10 max-w-md mx-auto shadow-soft">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-2">
              Recipe Not Available
            </h2>
            <p className="text-neutral-500 text-sm mb-6">
              We couldn't retrieve this recipe from the catalog right now.
            </p>
            <Link to="/search/random/all" className="btn-primary text-sm px-6 py-2.5">
              Browse More Recipes
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const recipeImage =
    recipe.image || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80";

  const originalServings = recipe.servings || 4;
  const ratio = originalServings > 0 ? servings / originalServings : 1;

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleStepCompleted = (stepNum) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Recipe link copied to clipboard! 📋", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  const formatAmount = (baseAmount) => {
    if (!baseAmount) return "";
    const scaled = baseAmount * ratio;
    if (scaled < 0.1) return scaled.toFixed(2);
    if (Number.isInteger(scaled)) return scaled.toString();
    return scaled.toFixed(1).replace(/\.0$/, "");
  };

  // Collect equipment used
  const equipmentSet = new Map();
  if (recipe.analyzedInstructions) {
    recipe.analyzedInstructions.forEach((inst) => {
      inst.steps?.forEach((st) => {
        st.equipment?.forEach((eq) => {
          if (!equipmentSet.has(eq.id || eq.name)) {
            equipmentSet.set(eq.id || eq.name, eq.name);
          }
        });
      });
    });
  }
  const equipmentList = Array.from(equipmentSet.values());

  const totalSteps =
    recipe.analyzedInstructions?.[0]?.steps?.length || 0;
  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent =
    totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <>
      <NavBar />
      {/* Floating Kitchen Timer */}
      <CookingTimer defaultMinutes={recipe.readyInMinutes || 15} />

      <div className="min-h-screen bg-gradient-cool pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs text-neutral-500 mb-6 animate-fade-in">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link to="/search/random/all" className="hover:text-primary-600">Recipes</Link>
            <span>/</span>
            <span className="text-neutral-800 font-medium truncate max-w-xs">{recipe.title}</span>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
            {/* Image Col */}
            <div className="lg:col-span-5 animate-slide-up">
              <div className="relative rounded-3xl overflow-hidden shadow-strong border border-white">
                <img
                  src={recipeImage}
                  alt={recipe.title}
                  className="w-full h-80 sm:h-96 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                {/* Favorite & Share Bar */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(recipe)}
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-soft ${
                      isFavorite(recipe.id)
                        ? "bg-red-500 text-white scale-105"
                        : "bg-white/80 hover:bg-white text-neutral-700 hover:text-red-500"
                    }`}
                    title={isFavorite(recipe.id) ? "Remove from favorites" : "Save recipe"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-11 h-11 rounded-2xl bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center backdrop-blur-md transition-all shadow-soft"
                    title="Copy Link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="w-11 h-11 rounded-2xl bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center backdrop-blur-md transition-all shadow-soft"
                    title="Print Recipe"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dietary badges on image */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {recipe.vegetarian && (
                    <span className="px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-bold backdrop-blur-md shadow-soft">
                      🌿 Vegetarian
                    </span>
                  )}
                  {recipe.vegan && (
                    <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold backdrop-blur-md shadow-soft">
                      🌱 Vegan
                    </span>
                  )}
                  {recipe.glutenFree && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold backdrop-blur-md shadow-soft">
                      🌾 Gluten-Free
                    </span>
                  )}
                  {recipe.dairyFree && (
                    <span className="px-3 py-1 rounded-full bg-blue-500/90 text-white text-xs font-bold backdrop-blur-md shadow-soft">
                      🥛 Dairy-Free
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info Col */}
            <div className="lg:col-span-7 flex flex-col justify-between animate-slide-up">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-neutral-800 leading-tight mb-4">
                  {recipe.title}
                </h1>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-white rounded-2xl p-3 text-center border border-neutral-100 shadow-soft">
                    <span className="text-xs text-neutral-400 block font-medium">Ready In</span>
                    <span className="text-lg font-bold text-neutral-800 font-display">
                      {recipe.readyInMinutes}m
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-3 text-center border border-neutral-100 shadow-soft">
                    <span className="text-xs text-neutral-400 block font-medium">Servings</span>
                    <span className="text-lg font-bold text-neutral-800 font-display">
                      {servings}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-3 text-center border border-neutral-100 shadow-soft">
                    <span className="text-xs text-neutral-400 block font-medium">Health Score</span>
                    <span className="text-lg font-bold text-primary-600 font-display">
                      {recipe.healthScore || 85}%
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-3 text-center border border-neutral-100 shadow-soft hidden sm:block">
                    <span className="text-xs text-neutral-400 block font-medium">Likes</span>
                    <span className="text-lg font-bold text-amber-500 font-display">
                      {recipe.aggregateLikes || 120}
                    </span>
                  </div>
                </div>

                {/* Servings Scaler */}
                <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-soft flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide block">
                      Scale Portions
                    </span>
                    <span className="text-xs text-neutral-400">
                      Ingredients will update automatically
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setServings((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center font-bold text-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="font-display font-bold text-neutral-800 w-8 text-center text-lg">
                      {servings}
                    </span>
                    <button
                      onClick={() => setServings((prev) => prev + 1)}
                      className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center font-bold text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Summary / Description */}
                {recipe.summary && (
                  <div className="text-neutral-600 text-sm leading-relaxed mb-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-neutral-100">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: recipe.summary.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1"),
                      }}
                      className="line-clamp-4 hover:line-clamp-none transition-all"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main 2-Col Content: Ingredients & Cooking Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Ingredients Col */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-soft border border-neutral-100">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🥗</span>
                    <h2 className="text-xl font-display font-bold text-neutral-800">
                      Ingredients
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-neutral-400">
                    {recipe.extendedIngredients?.length || 0} items
                  </span>
                </div>

                <div className="space-y-2.5">
                  {recipe.extendedIngredients?.map((ing, idx) => {
                    const isChecked = checkedIngredients[idx];
                    return (
                      <div
                        key={ing.id ? `${ing.id}-${idx}` : idx}
                        onClick={() => toggleIngredientCheck(idx)}
                        className={`flex items-start space-x-3 p-3 rounded-xl cursor-pointer transition-all border ${
                          isChecked
                            ? "bg-neutral-50 border-transparent opacity-50"
                            : "bg-white hover:bg-primary-50/50 border-neutral-100"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-primary-600 text-white"
                              : "border-2 border-neutral-300 bg-white"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3.5 h-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 text-sm">
                          <span
                            className={`font-semibold text-neutral-800 ${
                              isChecked ? "line-through text-neutral-400" : ""
                            }`}
                          >
                            {formatAmount(ing.amount)} {ing.unit}{" "}
                          </span>
                          <span
                            className={isChecked ? "line-through text-neutral-400" : "text-neutral-600"}
                          >
                            {ing.nameClean || ing.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Equipment list card */}
              {equipmentList.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-soft border border-neutral-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl">🍳</span>
                    <h3 className="text-lg font-display font-bold text-neutral-800">
                      Equipment Needed
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {equipmentList.map((eq, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-medium capitalize"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions Col */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-neutral-100">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">👩‍🍳</span>
                    <h2 className="text-xl font-display font-bold text-neutral-800">
                      Cooking Steps
                    </h2>
                  </div>
                  {totalSteps > 0 && (
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {progressPercent}% Done
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {totalSteps > 0 && (
                  <div className="w-full h-2 bg-neutral-100 rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}

                {/* Step List */}
                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                  <div className="space-y-6">
                    {recipe.analyzedInstructions.map((instructionGroup, gIdx) => (
                      <div key={gIdx} className="space-y-4">
                        {instructionGroup.name && (
                          <h4 className="font-display font-bold text-base text-neutral-800 mt-2">
                            {instructionGroup.name}
                          </h4>
                        )}
                        {instructionGroup.steps?.map((step) => {
                          const isDone = completedSteps[step.number];
                          return (
                            <div
                              key={step.number}
                              onClick={() => toggleStepCompleted(step.number)}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                                isDone
                                  ? "bg-neutral-50/80 border-neutral-200/60 opacity-60"
                                  : "bg-white border-neutral-100 hover:border-primary-200 hover:shadow-soft"
                              }`}
                            >
                              <div className="flex items-start space-x-4">
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                                    isDone
                                      ? "bg-green-500 text-white"
                                      : "bg-gradient-primary text-white shadow-soft"
                                  }`}
                                >
                                  {isDone ? "✓" : step.number}
                                </div>
                                <div className="flex-1">
                                  <p
                                    className={`leading-relaxed text-sm md:text-base ${
                                      isDone
                                        ? "line-through text-neutral-400"
                                        : "text-neutral-700"
                                    }`}
                                  >
                                    {step.step}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : recipe.instructions ? (
                  <div
                    className="text-neutral-700 leading-relaxed text-sm md:text-base space-y-4"
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                  />
                ) : (
                  <p className="text-neutral-500 text-sm">
                    No detailed step instructions provided for this recipe.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recipe;
