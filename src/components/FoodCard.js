import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const FoodCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const imageUrl =
    (recipe.image &&
      (isValidUrl(recipe.image)
        ? recipe.image
        : `https://spoonacular.com/recipeImages/${recipe.image}`)) ||
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80";

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="group block h-full">
      <div className="card card-hover h-full flex flex-col relative border border-neutral-100/80">
        {/* Food Image */}
        <div className="relative overflow-hidden h-48 w-full bg-neutral-100 flex-shrink-0">
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={imageUrl}
            alt={recipe.title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

          {/* Favorite heart button */}
          <button
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
            className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-soft ${
              favorite
                ? "bg-red-500 text-white scale-110 shadow-medium"
                : "bg-black/30 hover:bg-black/50 text-white hover:scale-110"
            }`}
          >
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
          </button>

          {/* Badges on right */}
          <div className="absolute top-3 right-3 flex flex-col items-end space-y-1.5">
            {recipe.readyInMinutes && (
              <div className="glass rounded-full px-2.5 py-1 flex items-center space-x-1 shadow-soft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-white text-xs font-semibold">{recipe.readyInMinutes}m</span>
              </div>
            )}
            {recipe.servings && (
              <div className="glass rounded-full px-2.5 py-1 flex items-center space-x-1 shadow-soft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white text-xs font-semibold">{recipe.servings}p</span>
              </div>
            )}
          </div>

          {/* Quick Dietary pills */}
          <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1">
            {recipe.vegetarian && (
              <span className="px-2 py-0.5 rounded-md bg-green-500/90 text-white text-[10px] font-bold backdrop-blur-sm shadow-soft">
                VEG
              </span>
            )}
            {recipe.glutenFree && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-white text-[10px] font-bold backdrop-blur-sm shadow-soft">
                GF
              </span>
            )}
          </div>
        </div>

        {/* Food title and info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-base md:text-lg text-neutral-800 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 mb-2">
              {recipe.title}
            </h3>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center space-x-1 text-primary-600 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-amber-500 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{recipe.aggregateLikes ? `${recipe.aggregateLikes} likes` : "Popular"}</span>
            </div>

            <span className="text-primary-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center space-x-1">
              <span>Cook Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
