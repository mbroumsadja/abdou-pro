"use client"

import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/lib/types"
import { getFavorites } from "@/lib/favorites"

type FavoritesProps = {
  onProductClick: (product: Product) => void
}

export function Favorites({ onProductClick }: FavoritesProps) {
  const [favorites, setFavorites] = useState<Product[]>([])

  useEffect(() => {
    setFavorites(getFavorites())

    // Listen for storage events to update favorites in real-time
    const handleStorageChange = () => {
      setFavorites(getFavorites())
    }

    window.addEventListener("favoritesUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("favoritesUpdated", handleStorageChange)
    }
  }, [])

  return (
    <div className="pb-4">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 shadow-sm">
        <h1 className="text-xl font-bold text-rose-500">Mes Favoris</h1>
      </header>

      <main className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Vous n'avez pas encore de favoris</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Explorez des produits et ajoutez-les à vos favoris en cliquant sur l'icône de cœur
            </p>
          </div>
        ) : (
          <ProductGrid products={favorites} onProductClick={onProductClick} />
        )}
      </main>
    </div>
  )
}
