import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      <div className="container mx-auto px-6 py-14">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-2.5 mb-4 group">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-display font-extrabold text-gradient">
                Kasbah Kitchen
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-md text-sm leading-relaxed">
              Your ultimate culinary companion. Discover world-class recipes, explore vibrant cuisines,
              and create memorable culinary masterpieces in your own home.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/zenitsudono/-Kasbah-Kitchen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 text-neutral-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <Link
                to="/favorites"
                aria-label="Saved Recipes"
                className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center hover:bg-red-500 transition-colors duration-300 text-neutral-300 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4 text-neutral-200">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search/random/all" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Saved Recipes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  About Kasbah Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-bold mb-4 text-neutral-200">Cuisine Types</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/search/random/main course" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Main Courses
                </Link>
              </li>
              <li>
                <Link to="/search/random/dessert" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Desserts & Sweets
                </Link>
              </li>
              <li>
                <Link to="/search/random/appetizer" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Appetizers & Tapas
                </Link>
              </li>
              <li>
                <Link to="/search/salad/all" className="text-neutral-400 hover:text-primary-400 transition-colors">
                  Healthy Salads
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Kasbah Kitchen. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-neutral-200 transition-colors">
              Story
            </Link>
            <Link to="/favorites" className="hover:text-neutral-200 transition-colors">
              Cookbook
            </Link>
            <Link to="/search/random/all" className="hover:text-neutral-200 transition-colors">
              Recipes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
