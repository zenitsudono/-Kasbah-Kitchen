import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const Toast = () => {
  const { toast } = useFavorites();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div
        className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-strong backdrop-blur-md border ${
          isSuccess
            ? "bg-neutral-900/95 text-white border-primary-500/40"
            : "bg-neutral-900/95 text-white border-neutral-700"
        }`}
      >
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isSuccess ? "bg-primary-500 text-white" : "bg-neutral-700 text-neutral-300"
          }`}
        >
          {isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <p className="text-sm font-medium pr-2">{toast.message}</p>
      </div>
    </div>
  );
};

export default Toast;
