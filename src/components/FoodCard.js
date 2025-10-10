import React from "react";
import { Link } from "react-router-dom";

const FoodCard = ({ recipe }) => {
  // Construct the image URL using the Spoonacular API's image base URL and the image file name from the recipe object
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
    "https://via.placeholder.com/300x150?text=No%20Image";

  return (
    <Link to={`/recipe/${recipe.id}`} className="group block">
      <div className="card card-hover h-full">
        {/* Food Image */}
        <div className="relative overflow-hidden">
          <img
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={imageUrl}
            alt={recipe.title}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Cook time badge */}
          <div className="absolute top-3 right-3 glass rounded-full px-3 py-1.5 flex items-center space-x-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white text-sm font-medium">{recipe.readyInMinutes}m</span>
          </div>

          {/* Servings badge */}
          {recipe.servings && (
            <div className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 flex items-center space-x-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-white text-sm font-medium">{recipe.servings}</span>
            </div>
          )}
        </div>

        {/* Food title and info */}
        <div className="p-6">
          <h3 className="font-display font-semibold text-lg text-neutral-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {recipe.title}
          </h3>
          
          {/* Additional info */}
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span>{recipe.aggregateLikes || 'New'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span>{recipe.pricePerServing ? `$${(recipe.pricePerServing / 100).toFixed(2)}` : 'Free'}</span>
            </div>
          </div>

          {/* View recipe button */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="btn-primary w-full text-center text-sm py-2">
              View Recipe
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
