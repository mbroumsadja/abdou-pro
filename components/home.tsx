"use client"

import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/lib/types"
import { Search } from "lucide-react"

type HomeProps = {
  onProductClick: (product: Product) => void
}

export function Home({ onProductClick }: HomeProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load mock data
    import("@/lib/mock-data").then(({ products }) => {
      setProducts(products)
      setLoading(false)
    })
  }, [])

  return (
    <div className="pb-4">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-rose-500">PinShop</h1>
          <div className="relative w-full max-w-md mx-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-800">
              <Search size={18} className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="ml-2 w-full bg-transparent focus:outline-none text-sm"
                readOnly
              />
            </div>
          </div>
        </div>
      </header>

      <main className="p-4">
        <h2 className="text-lg font-semibold mb-4">Tendances</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <ProductGrid products={products} onProductClick={onProductClick} />
        )}
      </main>
    </div>
  )
}
