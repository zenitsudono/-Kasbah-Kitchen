import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  const features = [
    {
      title: "Global Recipe Discovery",
      desc: "Thousands of verified recipes across all international cuisines, from traditional tagines to quick 15-minute weeknight dinners.",
      icon: "🌍",
    },
    {
      title: "Smart Portion Scaler",
      desc: "Cooking for a solo meal or a large gathering? Scale ingredient amounts dynamically with a single tap.",
      icon: "⚖️",
    },
    {
      title: "Interactive Cooking Mode",
      desc: "Check off ingredients as you prep and track every step with a built-in kitchen timer that rings when ready.",
      icon: "⏱️",
    },
    {
      title: "Personal Cookbook",
      desc: "Bookmark your favorite recipes and build your personalized meal plan with zero sign-up friction.",
      icon: "❤️",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-cool pt-28 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Banner */}
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
              Our Culinary Journey
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-neutral-800 mb-6 leading-tight">
              Bringing the Magic of <span className="text-gradient">Kasbah Kitchen</span> to Your Table
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Named after the historic fortified quarters where aromatic spices, bubbling tagines, and warm hospitality come together, Kasbah Kitchen is designed to make joyful home cooking effortless for everyone.
            </p>
          </div>

          {/* Story Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-neutral-100 mb-16 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 mb-4">
                  Cooking without boundaries
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  Whether you're an experienced chef looking for gourmet inspiration or a beginner figuring out what to make with ingredients in your fridge, cooking should be exciting, never stressful.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  We blend rich culinary culture with intuitive modern technology so you spend less time searching and more time savoring unforgettable meals with the people you love.
                </p>
              </div>
              <div className="bg-gradient-primary rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center items-center text-center shadow-strong">
                <span className="text-6xl mb-4">🍲</span>
                <blockquote className="text-xl font-display font-semibold italic mb-3">
                  "Good food is the foundation of genuine happiness."
                </blockquote>
                <p className="text-sm opacity-90">— Auguste Escoffier</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-center text-neutral-800 mb-10">
              Why Cooks Love Kasbah Kitchen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feat, index) => (
                <div
                  key={index}
                  className="card p-6 border border-neutral-100 flex items-start space-x-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl p-3 bg-neutral-100 rounded-2xl flex-shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-cool rounded-3xl p-10 border border-neutral-200">
            <h3 className="text-2xl font-display font-bold text-neutral-800 mb-3">
              Ready to create something delicious?
            </h3>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Dive into our handpicked recipe library or search by your favorite craving.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="btn-primary">
                Return Home
              </Link>
              <Link to="/search/random/all" className="btn-secondary">
                Explore All Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
