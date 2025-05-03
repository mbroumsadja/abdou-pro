"use client"

import { Home, Search, Heart, User } from "lucide-react"

type NavigationProps = {
  currentView: string
  onChangeView: (view: "home" | "search" | "favorites" | "profile") => void
}

export function Navigation({ currentView, onChangeView }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => onChangeView("home")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            currentView === "home" ? "text-rose-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Accueil</span>
        </button>
        <button
          onClick={() => onChangeView("search")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            currentView === "search" ? "text-rose-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Search size={24} />
          <span className="text-xs mt-1">Recherche</span>
        </button>
        <button
          onClick={() => onChangeView("favorites")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            currentView === "favorites" ? "text-rose-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Heart size={24} />
          <span className="text-xs mt-1">Favoris</span>
        </button>
        <button
          onClick={() => onChangeView("profile")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            currentView === "profile" ? "text-rose-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profil</span>
        </button>
      </div>
    </div>
  )
}
