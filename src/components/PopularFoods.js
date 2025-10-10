import React, { useState } from "react";
import useFetchPopularFood from "../hooks/useFetchPopularFood";
import FoodCard from "./FoodCard";
import LoadIcon from "../img/icon/loading.gif";

const PopularFoods = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 8;

  // Calling the `useFetchPopularFood` hook for fetching popular food data
  const { isLoading, error, data } = useFetchPopularFood(pageNumber, pageSize);

  // Define two functions to handle pagination
  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  // If the data is loading, show a loading icon
  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-cool">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-8">
            Popular Food Recipes
          </h2>
          <div className="flex flex-col items-center justify-center">
            <img src={LoadIcon} alt="loading" className="w-16 h-16 mb-4" />
            <p className="text-neutral-600">Loading delicious recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  // If there is an error, show the error message
  if (error) {
    return (
      <div className="py-16 bg-gradient-cool">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 mb-4">
              We couldn't load the recipes. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary text-sm px-4 py-2"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If there is data, render it
  return (
    <div className="py-16 bg-gradient-cool">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            Popular Food Recipes
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover the most loved recipes from our community. These dishes are trending for a reason!
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {data &&
            data.map((recipe, index) => (
              <div key={recipe.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FoodCard recipe={recipe} />
              </div>
            ))}
        </div>

        {/* Pagination */}
        {data && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pageNumber === 1
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "btn-ghost hover:scale-105"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span>Previous</span>
            </button>

            {/* Page indicator */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-xl shadow-soft">
              <span className="text-sm font-medium text-neutral-600">Page</span>
              <span className="text-lg font-bold text-gradient">{pageNumber}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={data.length < pageSize}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                data.length < pageSize
                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                  : "btn-ghost hover:scale-105"
              }`}
            >
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularFoods;
