import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass fixed w-full z-50 px-6 py-4 animate-fade-in">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient">
              Kasbah Kitchen
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            to="/search/random/all" 
            className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group"
          >
            Recipes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <a 
            href="/about" 
            className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
          </a>
          <Link 
            to="/search/random/all" 
            className="btn-primary text-sm px-4 py-2"
          >
            Explore Recipes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-neutral-700"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-strong animate-slide-in">
          <div className="px-6 py-4 space-y-4">
            <Link 
              to="/" 
              className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search/random/all" 
              className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            <a 
              href="/about" 
              className="block text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300"
            >
              About
            </a>
            <Link 
              to="/search/random/all" 
              className="btn-primary text-sm px-4 py-2 w-full text-center block"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Recipes
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
