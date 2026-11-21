import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const SideBar = () => {
  const [isShow, setIsShow] = useState(false);
  const { keyword, mealType } = useParams();
  const [searchTerm, setSearchTerm] = useState(keyword === "random" ? "" : keyword || "");
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim() || "random";
    navigate(`/search/${encodeURIComponent(query)}/${mealType || "all"}`);
    setIsShow(false);
  };

  const mealTypes = [
    "Main Course",
    "Side Dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
    "Breakfast",
    "Soup",
    "Beverage",
    "Sauce",
    "Marinade",
    "Fingerfood",
    "Snack",
    "Drink",
  ];

  const handleCategoryClick = (type) => {
    const currentKeyword = searchTerm.trim() || keyword || "random";
    navigate(`/search/${encodeURIComponent(currentKeyword)}/${type.toLowerCase()}`);
    setIsShow(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed right-5 top-20 md:hidden block z-50 btn-ghost p-3 shadow-medium"
        onClick={() => setIsShow(!isShow)}
        aria-label="Toggle Categories"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-neutral-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isShow ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isShow ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:block md:w-72 lg:w-80 h-screen bg-white border-r border-neutral-200/80 fixed md:sticky top-0 z-40 transition-transform duration-300 shadow-strong md:shadow-none flex flex-col overflow-y-auto`}
      >
        <div className="p-6 flex flex-col flex-1">
          {/* Brand */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-display font-extrabold text-gradient">
                Kasbah Kitchen
              </span>
            </Link>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-neutral-100/80 border border-neutral-200 rounded-2xl py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:bg-white focus:border-primary-500 transition-all"
                placeholder="Search recipe..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          {/* Quick Nav Links */}
          <div className="space-y-1.5 mb-6 pb-6 border-b border-neutral-100">
            <Link
              to="/"
              className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link
              to="/favorites"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <span>❤️</span>
                <span>Saved Recipes</span>
              </div>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <span>✨</span>
              <span>About Kasbah</span>
            </Link>
          </div>

          {/* Categories */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Meal Categories
              </h2>
              {mealType && mealType !== "all" && (
                <button
                  onClick={() => handleCategoryClick("all")}
                  className="text-[11px] text-primary-600 font-semibold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  !mealType || mealType === "all"
                    ? "bg-primary-50 text-primary-600 font-bold"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <span>All Categories</span>
                {(!mealType || mealType === "all") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                )}
              </button>

              {mealTypes.map((type) => {
                const isActive = mealType === type.toLowerCase();
                return (
                  <button
                    key={type}
                    onClick={() => handleCategoryClick(type)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-primary-50 text-primary-600 font-bold"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <span>{type}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
