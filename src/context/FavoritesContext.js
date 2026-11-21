import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("kasbah_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("kasbah_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => String(fav.id) === String(id));
  };

  const toggleFavorite = (recipe) => {
    if (!recipe || !recipe.id) return;
    const recipeId = String(recipe.id);
    const exists = favorites.some((fav) => String(fav.id) === recipeId);

    if (exists) {
      setFavorites((prev) => prev.filter((fav) => String(fav.id) !== recipeId));
      showToast(`Removed "${recipe.title || "Recipe"}" from saved`, "info");
    } else {
      const itemToSave = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes || 30,
        servings: recipe.servings || 4,
        vegetarian: recipe.vegetarian || false,
        glutenFree: recipe.glutenFree || false,
        healthScore: recipe.healthScore || 0,
        savedAt: new Date().toISOString(),
      };
      setFavorites((prev) => [itemToSave, ...prev]);
      showToast(`Saved "${recipe.title || "Recipe"}" to your favorites! ❤️`, "success");
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => String(fav.id) !== String(id)));
    showToast("Recipe removed from favorites", "info");
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    showToast("Cleared all favorites", "info");
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearAllFavorites,
        toast,
        showToast,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
