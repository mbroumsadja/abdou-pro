"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { toggleFavorite, isFavorite } from "@/lib/favorites"

type ProductDetailProps = {
  product: Product
  onBack: () => void
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(isFavorite(product.id))
  }, [product.id])

  const handleFavoriteClick = () => {
    toggleFavorite(product)
    setIsFav(!isFav)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Découvrez ${product.name} sur PinShop`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Erreur lors du partage:", err)
        })
    } else {
      alert("Le partage n'est pas supporté sur ce navigateur")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 shadow-sm flex items-center">
        <button onClick={onBack} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold flex-1 truncate">{product.name}</h1>
      </header>

      <div className="p-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-auto rounded-lg mb-6 object-cover"
          style={{ maxHeight: "60vh" }}
        />

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-1">{product.name}</h2>
          <p className="text-rose-500 font-bold text-xl mb-4">{product.price} €</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className="flex-1 bg-rose-500 text-white py-3 rounded-full font-medium"
            onClick={() => alert("Ajouté au panier")}
          >
            Ajouter au panier
          </button>
          <button
            className={`p-3 rounded-full border ${
              isFav ? "bg-rose-500 border-rose-500 text-white" : "border-gray-300 dark:border-gray-700"
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart size={24} fill={isFav ? "white" : "none"} />
          </button>
          <button className="p-3 rounded-full border border-gray-300 dark:border-gray-700" onClick={handleShare}>
            <Share2 size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Produits similaires</h3>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=100&width=100&text=Produit+${index + 1}`}
                  alt={`Produit similaire ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
