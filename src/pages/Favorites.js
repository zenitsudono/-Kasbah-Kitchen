import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favorites, clearAllFavorites } = useFavorites();
  const [filterQuery, setFilterQuery] = useState("");

  const filteredFavorites = favorites.filter((recipe) =>
    recipe.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-cool pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Your Personal Cookbook</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-800 mb-3">
              Saved Recipes
            </h1>
            <p className="text-neutral-600">
              {favorites.length === 0
                ? "You haven't bookmarked any recipes yet."
                : `You have ${favorites.length} delicious ${
                    favorites.length === 1 ? "recipe" : "recipes"
                  } ready to cook.`}
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-8">
              {/* Filter Search Input */}
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Filter saved recipes..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200 text-sm outline-none focus:border-primary-500 shadow-soft"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Clear All Button */}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear all your saved recipes?")) {
                    clearAllFavorites();
                  }
                }}
                className="text-xs text-neutral-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                Clear all favorites
              </button>
            </div>
          )}

          {/* Empty State */}
          {favorites.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl shadow-soft border border-neutral-100 animate-slide-up">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 fill-current opacity-80"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-display font-bold text-neutral-800 mb-2">
                No saved recipes yet
              </h2>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                Whenever you find a dish you'd love to make, click the heart icon on any recipe card to save it here for quick access!
              </p>
              <Link to="/search/random/all" className="btn-primary inline-flex items-center space-x-2 text-sm">
                <span>Explore Recipes</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ) : filteredFavorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">No saved recipes match "{filterQuery}".</p>
              <button
                onClick={() => setFilterQuery("")}
                className="text-primary-600 hover:underline text-sm font-medium"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredFavorites.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <FoodCard recipe={recipe} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
