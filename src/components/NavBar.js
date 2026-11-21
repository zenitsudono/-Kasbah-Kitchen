import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (!navSearch.trim()) return;
    navigate(`/search/${encodeURIComponent(navSearch.trim())}/all`);
    setNavSearch("");
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft py-3"
          : "bg-white/70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-2xl font-display font-extrabold text-gradient tracking-tight">
            Kasbah Kitchen
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleNavSearch}
          className="hidden lg:flex items-center relative w-72 max-w-xs"
        >
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-neutral-100/90 border border-neutral-200 focus:bg-white focus:border-primary-500 outline-none transition-all shadow-inner"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-neutral-400 absolute left-3"
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
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-7">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors relative py-1 ${
              isActive("/") ? "text-primary-600 font-semibold" : "text-neutral-700 hover:text-primary-600"
            }`}
          >
            Home
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary rounded-full"></span>
            )}
          </Link>

          <Link
            to="/search/random/all"
            className={`text-sm font-medium transition-colors relative py-1 ${
              isActive("/search") ? "text-primary-600 font-semibold" : "text-neutral-700 hover:text-primary-600"
            }`}
          >
            Recipes
            {isActive("/search") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary rounded-full"></span>
            )}
          </Link>

          <Link
            to="/favorites"
            className={`text-sm font-medium transition-colors relative py-1 flex items-center space-x-1.5 ${
              isActive("/favorites") ? "text-primary-600 font-semibold" : "text-neutral-700 hover:text-primary-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 ${favoritesCount > 0 ? "text-red-500 fill-current" : "fill-none stroke-current"}`}
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full leading-none">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link
            to="/about"
            className={`text-sm font-medium transition-colors relative py-1 ${
              isActive("/about") ? "text-primary-600 font-semibold" : "text-neutral-700 hover:text-primary-600"
            }`}
          >
            About
            {isActive("/about") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary rounded-full"></span>
            )}
          </Link>

          <Link
            to="/search/random/all"
            className="btn-primary text-xs px-4 py-2 flex items-center space-x-1.5 shadow-soft"
          >
            <span>Explore All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <Link
            to="/favorites"
            className="relative p-2 text-neutral-700 hover:text-primary-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 ${favoritesCount > 0 ? "text-red-500 fill-current" : "fill-none stroke-current"}`}
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center leading-none">
                {favoritesCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
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
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 shadow-strong animate-slide-up">
          <form onSubmit={handleNavSearch} className="mb-4">
            <input
              type="text"
              placeholder="Search recipes, ingredients..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-sm outline-none focus:border-primary-500"
            />
          </form>

          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/") ? "bg-primary-50 text-primary-600 font-semibold" : "text-neutral-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/search/random/all"
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/search") ? "bg-primary-50 text-primary-600 font-semibold" : "text-neutral-700"
              }`}
            >
              Browse Recipes
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                isActive("/favorites") ? "bg-primary-50 text-primary-600 font-semibold" : "text-neutral-700"
              }`}
            >
              <span>Saved Recipes</span>
              {favoritesCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive("/about") ? "bg-primary-50 text-primary-600 font-semibold" : "text-neutral-700"
              }`}
            >
              About Kasbah Kitchen
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
