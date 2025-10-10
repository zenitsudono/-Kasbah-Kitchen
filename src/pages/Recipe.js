import React from "react";
import { useParams } from "react-router-dom";
import useFetchRecipe from "../hooks/useFetchRecipe";
import LoadIcon from "../img/icon/loading.gif";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, isError } = useFetchRecipe(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center">
        <NavBar />
        <div className="flex flex-col items-center justify-center">
          <img src={LoadIcon} alt="Loading" className="w-16 h-16 mb-4" />
          <p className="text-neutral-600 text-lg">Loading delicious recipe...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center">
        <NavBar />
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Recipe Not Found</h3>
          <p className="text-red-600 mb-4">
            We couldn't load this recipe. Please try again later.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary text-sm px-4 py-2"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const recipeImage = recipe.image
    ? recipe.image
    : "https://via.placeholder.com/640x360?text=No+Image";

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-warm">
        <div className="container mx-auto px-6 py-24">
          {/* Recipe Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
              {recipe.title}
            </h1>
            
            {/* Recipe Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="glass rounded-xl px-4 py-2 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-white font-medium">{recipe.readyInMinutes} minutes</span>
              </div>
              
              <div className="glass rounded-xl px-4 py-2 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white font-medium">{recipe.servings} servings</span>
              </div>
              
              {recipe.aggregateLikes && (
                <div className="glass rounded-xl px-4 py-2 flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                  <span className="text-white font-medium">{recipe.aggregateLikes} likes</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recipe Image */}
            <div className="lg:col-span-1 animate-slide-up">
              <div className="card overflow-hidden">
                <img
                  className="w-full h-64 md:h-80 object-cover"
                  src={recipeImage}
                  alt={recipe.title}
                />
              </div>
            </div>

            {/* Recipe Content */}
            <div className="lg:col-span-2 space-y-8 animate-slide-up">
              {/* Recipe Summary */}
              {recipe.summary && (
                <div className="card p-6">
                  <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">
                    About This Recipe
                  </h2>
                  <div
                    className="text-neutral-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: recipe.summary }}
                  />
                </div>
              )}

              {/* Ingredients */}
              <div className="card p-6">
                <h2 className="text-2xl font-display font-bold text-neutral-800 mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 mr-3 text-primary-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                  Ingredients
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recipe.extendedIngredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-700">{ingredient.original}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="card p-6">
                <h2 className="text-2xl font-display font-bold text-neutral-800 mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 mr-3 text-primary-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                  Cooking Instructions
                </h2>
                <div className="space-y-6">
                  {recipe.analyzedInstructions.map((instruction, index) => (
                    <div key={index} className="border-l-4 border-primary-200 pl-6">
                      {instruction.name && (
                        <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                          {instruction.name}
                        </h3>
                      )}
                      <ol className="space-y-3">
                        {instruction.steps.map((step) => (
                          <li key={step.number} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {step.number}
                            </div>
                            <p className="text-neutral-700 leading-relaxed pt-1">
                              {step.step}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
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
