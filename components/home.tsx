"use client"

import { useState, useEffect } from "react"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/lib/types"
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  Bell, 
  Heart, 
  Filter,
  Grid3X3,
  List,
  MapPin,
  Star,
  TrendingUp,
  Flame,
  Zap,
  Tag,
  X
} from "lucide-react"

type HomeProps = {
  onProductClick: (product: Product) => void
}

export function Home({ onProductClick }: HomeProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [] as string[],
    sizes: [] as string[],
    priceRange: [0, 1000] as [number, number]
  })

  const categories = [
    { id: "all", name: "Tout", icon: Grid3X3 },
    { id: "trending", name: "Tendances", icon: TrendingUp },
    { id: "new", name: "Nouveautés", icon: Zap },
    { id: "popular", name: "Populaire", icon: Flame },
    { id: "deals", name: "Promotions", icon: Tag }
  ]

  const colors = [
    { name: "Bleu", value: "#0066FF" },
    { name: "Gris", value: "#4A5D23" },
    { name: "Noir", value: "#000000" },
    { name: "Vert", value: "#00AA00" },
    { name: "Rouge", value: "#FF0000" },
    { name: "Rose", value: "#FF00AA" },
    { name: "Beige", value: "#E6C2A6" },
    { name: "Orange", value: "#FF6600" },
    { name: "Violet", value: "#800080" },
    { name: "Marron", value: "#654321" },
    { name: "Jaune", value: "#FFFF00" },
    { name: "Blanc", value: "#FFFFFF" }
  ]

  const sizes = [
    "3-6ans", "6-9ans", "9-12ans", "12-15ans",
    "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"
  ]

  useEffect(() => {
    import("@/lib/mock-data").then(({ products }) => {
      setProducts(products)
      setLoading(false)
    })
  }, [])

  const handleColorFilter = (colorValue: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(colorValue)
        ? prev.colors.filter(c => c !== colorValue)
        : [...prev.colors, colorValue]
    }))
  }

  const handleSizeFilter = (size: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      colors: [],
      sizes: [],
      priceRange: [0, 1000]
    })
  }

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedCategory !== "all") {
      // Logique de filtrage par catégorie
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Menu size={20} />
              </button>
              <h1 className="text-2xl font-bold text-rose-500">PinShop</h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Que cherchez-vous ?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-3 flex-1 bg-transparent focus:outline-none text-sm"
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-full transition-colors ${
                  showFilters ? "bg-rose-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                <Filter size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Location & Quick Stats */}
        <div className="px-4 pb-3 border-b">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={14} />
              <span>Paris, France</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <span>1,247 produits</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-orange-400" fill="currentColor" />
                <span>4.8</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto gap-1 px-4 py-3 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={16} />
                {category.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filtres</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearFilters}
                  className="text-rose-500 text-sm font-medium"
                >
                  Effacer tout
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wide text-gray-600">
                Couleurs
              </h4>
              <div className="grid grid-cols-8 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorFilter(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedFilters.colors.includes(color.value)
                        ? "border-gray-800 scale-110"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    style={{ 
                      backgroundColor: color.value,
                      borderColor: color.value === "#FFFFFF" ? "#e5e7eb" : undefined
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wide text-gray-600">
                Tailles
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeFilter(size)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      selectedFilters.sizes.includes(size)
                        ? "border-rose-500 bg-rose-50 text-rose-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h4 className="font-medium mb-3 text-sm uppercase tracking-wide text-gray-600">
                Prix
              </h4>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  value={selectedFilters.priceRange[0]}
                  onChange={(e) => setSelectedFilters(prev => ({
                    ...prev,
                    priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                  }))}
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  value={selectedFilters.priceRange[1]}
                  onChange={(e) => setSelectedFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000]
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Controls */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {filteredProducts.length} produits
          </span>
          {(selectedFilters.colors.length > 0 || selectedFilters.sizes.length > 0) && (
            <span className="text-sm text-rose-500">• Filtré</span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <select className="text-sm border rounded-lg px-2 py-1">
            <option>Trier par</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Nouveautés</option>
            <option>Popularité</option>
          </select>
          
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-rose-500 text-white" : "hover:bg-gray-100"}`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-rose-500 text-white" : "hover:bg-gray-100"}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 mx-4 mt-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Offres Flash ⚡</h2>
            <p className="text-rose-100 mb-3">Jusqu'à -70% sur une sélection</p>
            <button className="bg-white text-rose-500 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
              Voir les offres
            </button>
          </div>
          <div className="text-6xl opacity-20">🔥</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-white p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-rose-500 mb-1">1.2K+</div>
          <div className="text-xs text-gray-600">Produits</div>
        </div>
        <div className="bg-white p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-500 mb-1">4.8★</div>
          <div className="text-xs text-gray-600">Satisfaction</div>
        </div>
        <div className="bg-white p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-500 mb-1">24h</div>
          <div className="text-xs text-gray-600">Livraison</div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp size={20} className="text-rose-500" />
            {selectedCategory === "all" ? "Tous les produits" : 
             categories.find(c => c.id === selectedCategory)?.name}
          </h2>
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProductGrid 
            products={filteredProducts} 
            onProductClick={onProductClick}
            viewMode={viewMode}
          />
        )}

        {/* Load More */}
        {!loading && filteredProducts.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-rose-500 text-white px-8 py-3 rounded-full font-medium hover:bg-rose-600 transition-colors">
              Charger plus de produits
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-colors z-10">
        <Search size={20} />
      </button>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
    </div>
  )
}
