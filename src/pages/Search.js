import React from "react";
import useSearch from "../hooks/useSearch";
import FoodCard from "../components/FoodCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadIcon from "../img/icon/loading.gif";

const Search = () => {
  const { keyword: keywordParam, mealType: mealTypeParam } = useParams();
  const mealType = mealTypeParam === "all" ? "" : mealTypeParam;
  const keyword = keywordParam === "random" ? "" : keywordParam;

  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 8;
  const { isLoading, error, data } = useSearch(
    keyword,
    pageNumber,
    pageSize,
    mealType
  );

  // Reset page number to 0 when keyword changes
  useEffect(() => {
    setPageNumber(0);
  }, [keyword, mealType, setPageNumber]);

  // Define two functions to handle pagination
  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-cool w-full min-h-screen pt-20 md:pt-8">
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="flex flex-col items-center">
            <img src={LoadIcon} alt="Loading" className="w-16 h-16 mb-4" />
            <p className="text-neutral-600 text-lg">Searching for delicious recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-cool w-full min-h-screen pt-20 md:pt-8">
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Search Error</h3>
            <p className="text-red-600 mb-4">
              We couldn't search for recipes. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary text-sm px-4 py-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-cool w-full min-h-screen pt-20 md:pt-8">
      <div className="container mx-auto px-6 py-8">
        {/* Search Header */}
        <div className="mb-8 animate-fade-in">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient mb-2">
              {keyword ? `Search Results for "${keyword}"` : "Browse All Recipes"}
            </h1>
            {mealType && (
              <p className="text-lg text-neutral-600 capitalize">
                Filtered by: <span className="font-semibold text-primary-600">{mealType}</span>
              </p>
            )}
            {data && (
              <p className="text-sm text-neutral-500 mt-2">
                Found {data.length} recipe{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {data && data.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-neutral-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">No Recipes Found</h3>
              <p className="text-neutral-600 mb-6">
                We couldn't find any recipes matching your search. Try different keywords or browse our categories.
              </p>
              <div className="space-x-3">
                <button
                  onClick={() => window.history.back()}
                  className="btn-ghost text-sm px-4 py-2"
                >
                  Go Back
                </button>
                <a
                  href="/search/random/all"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Browse All
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {data &&
                data.map((recipe, index) => (
                  <div key={recipe.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <FoodCard recipe={recipe} />
                  </div>
                ))}
            </div>

            {/* Pagination */}
            {data && data.length > 0 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={pageNumber === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    pageNumber === 0
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
                  <span className="text-lg font-bold text-gradient">{pageNumber + 1}</span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
