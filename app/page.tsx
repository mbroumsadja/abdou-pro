"use client"

import { useState, useEffect } from "react"
import { Home } from "@/components/home"
import { ImageSearch } from "@/components/image-search"
import { Favorites } from "@/components/favorites"
import { Navigation } from "@/components/navigation"
import { ProductDetail } from "@/components/product-detail"
import type { Product } from "@/lib/types"

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "search" | "favorites" | "profile">("home")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Reset search results when returning to home
  useEffect(() => {
    if (currentView === "home") {
      setSearchResults([])
    }
  }, [currentView])

  const handleImageUpload = async (file: File) => {
    setIsSearching(true)

    // Simulate API call for image analysis
    setTimeout(() => {
      // Mock image analysis result
      const mockCategory = file.name.toLowerCase().includes("dress")
        ? "dresses"
        : file.name.toLowerCase().includes("furniture")
          ? "furniture"
          : "accessories"

      // Filter products based on mock analysis
      import("@/lib/mock-data").then(({ products }) => {
        const filteredProducts = products.filter(
          (product) => product.category === mockCategory || product.tags.includes(mockCategory),
        )
        setSearchResults(filteredProducts)
        setIsSearching(false)
      })
    }, 1500)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleBackToGrid = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={handleBackToGrid} />
      ) : (
        <>
          <div className="pb-16">
            {currentView === "home" && <Home onProductClick={handleProductClick} />}
            {currentView === "search" && (
              <ImageSearch
                onImageUpload={handleImageUpload}
                searchResults={searchResults}
                onProductClick={handleProductClick}
                isSearching={isSearching}
              />
            )}
            {currentView === "favorites" && <Favorites onProductClick={handleProductClick} />}
            {currentView === "profile" && (
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">Profil Utilisateur</h2>
                <p className="mt-4">Fonctionnalité à venir</p>
              </div>
            )}
          </div>
          <Navigation currentView={currentView} onChangeView={setCurrentView} />
        </>
      )}
    </div>
  )
}
