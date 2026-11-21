import React from "react";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import SideBarLayout from "./layout/SideBarLayout";
import Toast from "./components/Toast";
import { FavoritesProvider } from "./context/FavoritesContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const queryClient = new QueryClient();

// Support both local development at root ("/") and GitHub Pages deployment ("/-Kasbah-Kitchen")
const basename = window.location.pathname.startsWith("/-Kasbah-Kitchen")
  ? "/-Kasbah-Kitchen"
  : "";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <Router basename={basename}>
          <Toast />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/search/:keyword/:mealType"
              element={
                <SideBarLayout>
                  <Search />
                </SideBarLayout>
              }
            />
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
