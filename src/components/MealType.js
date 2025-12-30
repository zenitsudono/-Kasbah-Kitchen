import React from "react";
import DinnerIcon from "../img/icon/dinner.png";
import BreakfastIcon from "../img/icon/breakfast.png";
import SnackIcon from "../img/icon/snack.png";
import DessertIcon from "../img/icon/dessert.png";
import AppetizerIcon from "../img/icon/appetizer.png";
import SaladIcon from "../img/icon/salad.png";
import BreadIcon from "../img/icon/bread.png";
import SoupIcon from "../img/icon/soup.png";
import BeverageIcon from "../img/icon/beverage.png";
import SauceIcon from "../img/icon/sauce.png";
import MarinadeIcon from "../img/icon/marinade.png";
import DrinkIcon from "../img/icon/drink.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FoodCategory = () => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  
  const mealTypes = [
    { icon: DinnerIcon, title: "Main Course", color: "bg-gradient-primary" },
    { icon: DessertIcon, title: "Dessert", color: "bg-gradient-accent" },
    { icon: AppetizerIcon, title: "Appetizer", color: "bg-gradient-secondary" },
    { icon: SaladIcon, title: "Salad", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { icon: BreadIcon, title: "Bread", color: "bg-gradient-to-br from-amber-400 to-amber-600" },
    { icon: BreakfastIcon, title: "Breakfast", color: "bg-gradient-to-br from-orange-400 to-orange-600" },
    { icon: SoupIcon, title: "Soup", color: "bg-gradient-to-br from-red-400 to-red-600", hidden: isHidden },
    { icon: BeverageIcon, title: "Beverage", color: "bg-gradient-to-br from-blue-400 to-blue-600", hidden: isHidden },
    { icon: SauceIcon, title: "Sauce", color: "bg-gradient-to-br from-purple-400 to-purple-600", hidden: isHidden },
    { icon: MarinadeIcon, title: "Marinade", color: "bg-gradient-to-br from-indigo-400 to-indigo-600", hidden: isHidden },
    { icon: SnackIcon, title: "Snack", color: "bg-gradient-to-br from-pink-400 to-pink-600", hidden: isHidden },
    { icon: DrinkIcon, title: "Drink", color: "bg-gradient-to-br from-cyan-400 to-cyan-600", hidden: isHidden },
  ];

  const MealTypeCard = ({ icon, title, color, hidden = false }) => {
    if (hidden) return null;
    
    return (
      <button
        className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 transform hover:scale-105 animate-slide-up"
        onClick={() => navigate(`/search/random/${title.toLowerCase()}`)}
      >
        <div className={`${color} p-6 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Icon */}
          <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
            <img src={icon} alt={title} className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg" />
          </div>
          
          {/* Title */}
          <p className="text-white font-display font-semibold text-sm md:text-base mt-3 relative z-10 drop-shadow-md">
            {title}
          </p>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </button>
    );
  };

  return (
    <div className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gradient mb-4">
            Find Your Type of Meal
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore our diverse collection of meal categories and discover your next favorite dish
          </p>
        </div>

        {/* Meal category cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {mealTypes.map((meal, index) => (
            <div key={meal.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <MealTypeCard 
                icon={meal.icon} 
                title={meal.title} 
                color={meal.color}
                hidden={meal.hidden}
              />
            </div>
          ))}
        </div>

        {/* Show more/less button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsHidden(!isHidden)}
            className="btn-ghost flex items-center space-x-2 px-6 py-3"
          >
            <span className="font-medium">
              {isHidden ? "Show More Categories" : "Show Less"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-5 h-5 transition-transform duration-300 ${isHidden ? 'rotate-0' : 'rotate-180'}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCategory;
