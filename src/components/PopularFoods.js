import React, { useState } from "react";
import useFetchPopularFood from "../hooks/useFetchPopularFood";
import FoodCard from "./FoodCard";
import LoadIcon from "../img/icon/loading.gif";

const FALLBACK_RECIPES = [
  {
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Toasted Breadcrumbs",
    readyInMinutes: 45,
    servings: 4,
    image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    aggregateLikes: 209,
    vegetarian: true,
    glutenFree: false,
  },
  {
    id: 715538,
    title: "Bruschetta Style Mediterranean Pork Tenderloin & Tagliatelle",
    readyInMinutes: 35,
    servings: 4,
    image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
    aggregateLikes: 142,
    vegetarian: false,
    glutenFree: false,
  },
  {
    id: 716004,
    title: "Quinoa and Chickpea Salad with Sun-Dried Tomatoes & Cherries",
    readyInMinutes: 45,
    servings: 6,
    image: "https://spoonacular.com/recipeImages/716004-556x370.jpg",
    aggregateLikes: 184,
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: 644387,
    title: "Garlic Butter Pan-Seared Salmon Fillet with Garden Herbs",
    readyInMinutes: 20,
    servings: 3,
    image: "https://spoonacular.com/recipeImages/644387-556x370.jpg",
    aggregateLikes: 310,
    vegetarian: false,
    glutenFree: true,
  },
  {
    id: 782585,
    title: "Cannellini Bean and Fresh Rosemary Stew with Olive Oil",
    readyInMinutes: 30,
    servings: 4,
    image: "https://spoonacular.com/recipeImages/782585-556x370.jpg",
    aggregateLikes: 167,
    vegetarian: true,
    glutenFree: false,
  },
  {
    id: 715497,
    title: "Super Berry Banana Acai Breakfast Bowl with Chia Seeds",
    readyInMinutes: 10,
    servings: 2,
    image: "https://spoonacular.com/recipeImages/715497-556x370.jpg",
    aggregateLikes: 432,
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: 715415,
    title: "Moroccan Spiced Red Lentil Soup with Roasted Cumin",
    readyInMinutes: 40,
    servings: 4,
    image: "https://spoonacular.com/recipeImages/715415-556x370.jpg",
    aggregateLikes: 256,
    vegetarian: true,
    glutenFree: true,
  },
  {
    id: 716381,
    title: "Slow-Cooked Savory Stew with Sweet Peppers and Plantains",
    readyInMinutes: 45,
    servings: 4,
    image: "https://spoonacular.com/recipeImages/716381-556x370.jpg",
    aggregateLikes: 98,
    vegetarian: false,
    glutenFree: true,
  },
];

const PopularFoods = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const pageSize = 8;

  const { isLoading, error, data } = useFetchPopularFood(pageNumber, pageSize);

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const activeRecipes = data && data.length > 0 ? data : error ? FALLBACK_RECIPES : [];

  const filteredRecipes = activeRecipes.filter((r) => {
    if (activeFilter === "quick") return (r.readyInMinutes || 30) <= 30;
    if (activeFilter === "veg") return r.vegetarian === true;
    return true;
  });

  return (
    <section className="py-20 bg-gradient-cool">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-3">
            Handpicked For You
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-neutral-800 mb-4">
            Popular Recipes This Week
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto text-sm md:text-base">
            Discover community-favorite meals, tested and loved by home cooks around the world.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-neutral-800 text-white shadow-medium"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              All Trending
            </button>
            <button
              onClick={() => setActiveFilter("quick")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === "quick"
                  ? "bg-neutral-800 text-white shadow-medium"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              ⏱️ Under 30 Mins
            </button>
            <button
              onClick={() => setActiveFilter("veg")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === "veg"
                  ? "bg-neutral-800 text-white shadow-medium"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              🌿 Vegetarian
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <img src={LoadIcon} alt="loading" className="w-12 h-12 mb-4 animate-spin-slow" />
            <p className="text-neutral-500 font-medium text-sm">Loading mouth-watering recipes...</p>
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && filteredRecipes.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mb-12">
              {filteredRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <FoodCard recipe={recipe} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-3">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  pageNumber === 1
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-white text-neutral-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Prev</span>
              </button>

              <div className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-neutral-700 shadow-soft">
                Page {pageNumber}
              </div>

              <button
                onClick={handleNextPage}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-neutral-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft transition-all"
              >
                <span>Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {!isLoading && filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-4">No recipes found for this filter.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="text-primary-600 text-sm font-semibold hover:underline"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularFoods;
