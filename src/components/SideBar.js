import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SideBar = () => {
  const [isShow, setIsShow] = useState(false);
  const { keyword, mealType } = useParams();
  const [searchTerm, setSearchTerm] = useState(keyword);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}/${mealType}`);
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

  const mealTypeBadge = ({ name, onClick }) => {
    const isActive = mealType === name.toLowerCase();
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
          isActive
            ? "bg-gradient-primary text-white shadow-medium"
            : "bg-white/80 text-neutral-700 hover:bg-white hover:shadow-soft"
        }`}
      >
        {name}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed right-5 top-20 md:hidden block z-50 btn-ghost p-3"
        onClick={() => setIsShow(!isShow)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-neutral-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isShow ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isShow ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:block md:w-1/4 h-screen w-3/4 bg-gradient-warm bg-side-bar-background md:pt-0 md:overflow-y-auto fixed md:static bg-cover z-40 transition-transform duration-300 lg:w-1/5 shadow-strong md:shadow-none`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-display font-bold text-gradient">
                Kasbah Kitchen
              </span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
                  <input
                    type="text"
                    className="w-full bg-transparent outline-none text-neutral-800 text-lg placeholder-neutral-500"
                    placeholder="Find Recipes"
                    value={searchTerm === "random" ? "" : searchTerm}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-neutral-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Meal Types */}
          <div className="flex-1">
            <h2 className="text-lg font-display font-bold text-neutral-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 mr-2 text-primary-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              Meal Categories
            </h2>

            <div className="space-y-3">
              {mealTypes.map((mealTypeName) => (
                <div key={mealTypeName}>
                  {mealTypeBadge({
                    name: mealTypeName,
                    onClick: () =>
                      navigate(`/search/${keyword}/${mealTypeName.toLowerCase()}`),
                  })}
                </div>
              ))}
              
              <div className="pt-2">
                {mealTypeBadge({
                  name: "All Categories",
                  onClick: () => navigate(`/search/${keyword}/all`),
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-white/80 rounded-xl backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-neutral-700 mb-2">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Popular</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>Quick</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Trending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
