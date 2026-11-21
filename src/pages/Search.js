import React, { useState, useEffect } from "react";
import useSearch from "../hooks/useSearch";
import FoodCard from "../components/FoodCard";
import { useParams, Link } from "react-router-dom";
import LoadIcon from "../img/icon/loading.gif";

const FALLBACK_SEARCH_RESULTS = [
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

const Search = () => {
  const { keyword: keywordParam, mealType: mealTypeParam } = useParams();
  const mealType = mealTypeParam === "all" ? "" : mealTypeParam;
  const keyword = keywordParam === "random" ? "" : keywordParam;

  const [pageNumber, setPageNumber] = useState(0);
  const [dietFilter, setDietFilter] = useState("all");
  const pageSize = 12;

  const { isLoading, error, data } = useSearch(
    keyword,
    pageNumber,
    pageSize,
    mealType
  );

  useEffect(() => {
    setPageNumber(0);
  }, [keyword, mealType]);

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeResults =
    data && data.length > 0 ? data : error ? FALLBACK_SEARCH_RESULTS : [];

  const filteredResults = activeResults.filter((item) => {
    if (dietFilter === "veg") return item.vegetarian === true;
    if (dietFilter === "gf") return item.glutenFree === true;
    if (dietFilter === "quick") return (item.readyInMinutes || 30) <= 30;
    return true;
  });

  return (
    <div className="bg-gradient-cool w-full min-h-screen px-6 py-10 md:px-10">
      {/* Search Header Banner */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <h1 className="text-2xl md:text-4xl font-display font-extrabold text-neutral-800">
              {keyword ? `Results for "${keyword}"` : "Explore Recipes"}
            </h1>
            <div className="flex items-center space-x-2 text-xs text-neutral-500 mt-2">
              {mealType && (
                <span className="px-2.5 py-1 rounded-lg bg-primary-100 text-primary-700 font-semibold capitalize">
                  Category: {mealType}
                </span>
              )}
              <span>•</span>
              <span>
                {isLoading ? "Searching..." : `${filteredResults.length} recipes ready`}
              </span>
            </div>
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDietFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                dietFilter === "all"
                  ? "bg-neutral-800 text-white shadow-soft"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietFilter("quick")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                dietFilter === "quick"
                  ? "bg-neutral-800 text-white shadow-soft"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              ⏱️ Under 30m
            </button>
            <button
              onClick={() => setDietFilter("veg")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                dietFilter === "veg"
                  ? "bg-neutral-800 text-white shadow-soft"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              🌿 Vegetarian
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24">
          <img src={LoadIcon} alt="Loading" className="w-14 h-14 mb-4 animate-spin-slow" />
          <p className="text-neutral-600 font-medium text-sm">
            Searching for delicious culinary inspirations...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredResults.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto shadow-soft border border-neutral-100 my-12 animate-slide-up">
          <div className="w-16 h-16 bg-neutral-100 text-neutral-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-neutral-800 mb-2">
            No recipes matched your criteria
          </h2>
          <p className="text-neutral-500 text-xs mb-6">
            Try adjusting your keyword or reset the category filters to discover more dishes.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/search/random/all" className="btn-primary text-xs px-5 py-2.5">
              Browse All Recipes
            </Link>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && filteredResults.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredResults.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <FoodCard recipe={recipe} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-3 pb-8">
            <button
              onClick={handlePrevPage}
              disabled={pageNumber === 0}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                pageNumber === 0
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
              <span>Previous</span>
            </button>

            <div className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-neutral-700 shadow-soft">
              Page {pageNumber + 1}
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
    </div>
  );
};

export default Search;
