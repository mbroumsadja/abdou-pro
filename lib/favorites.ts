import type { Product } from "./types"

// Get favorites from localStorage
export function getFavorites(): Product[] {
  if (typeof window === "undefined") return []

  const favorites = localStorage.getItem("favorites")
  return favorites ? JSON.parse(favorites) : []
}

// Check if a product is in favorites
export function isFavorite(productId: string): boolean {
  const favorites = getFavorites()
  return favorites.some((fav) => fav.id === productId)
}

// Toggle a product in favorites
export function toggleFavorite(product: Product): void {
  const favorites = getFavorites()

  const index = favorites.findIndex((fav) => fav.id === product.id)

  if (index === -1) {
    // Add to favorites
    favorites.push(product)
  } else {
    // Remove from favorites
    favorites.splice(index, 1)
  }

  localStorage.setItem("favorites", JSON.stringify(favorites))

  // Dispatch a custom event to notify components
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("favoritesUpdated"))
  }
}
