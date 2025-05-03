"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import type { Product } from "@/lib/types"
import { toggleFavorite, isFavorite } from "@/lib/favorites"

type ProductCardProps = {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(isFavorite(product.id))
  }, [product.id])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(product)
    setIsFav(!isFav)
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="w-full object-cover"
        style={{ aspectRatio: Math.random() > 0.5 ? "3/4" : "3/5" }}
      />
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 p-1.5 rounded-full ${
          isFav ? "bg-rose-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
        }`}
      >
        <Heart size={16} fill={isFav ? "white" : "none"} />
      </button>
      <div className="p-2">
        <h3 className="font-medium text-sm truncate">{product.name}</h3>
        <p className="text-rose-500 font-bold text-sm">{product.price} €</p>
      </div>
    </div>
  )
}
