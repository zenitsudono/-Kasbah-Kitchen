import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleUserInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = keyword.trim() || "random";
    navigate(`/search/${searchTerm}/all`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-hero-background bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="animate-slide-up mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 drop-shadow-2xl">
            Kasbah Kitchen
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium drop-shadow-lg">
            Your Best Cooking Companion
          </p>
          <p className="text-lg md:text-xl text-white/80 mt-4 drop-shadow-md">
            Discover amazing recipes, explore cuisines, and create culinary masterpieces
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto animate-slide-up">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-strong">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none text-neutral-800 text-lg placeholder-neutral-500"
                    placeholder="What are you craving today?"
                    value={keyword}
                    onChange={handleUserInput}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 flex items-center space-x-2"
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
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="mt-8 animate-fade-in">
          <p className="text-white/80 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Pasta', 'Chicken', 'Dessert', 'Healthy', 'Quick'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setKeyword(term);
                  navigate(`/search/${term}/all`);
                }}
                className="btn-ghost text-sm px-4 py-2 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
