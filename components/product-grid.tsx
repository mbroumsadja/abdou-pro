"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

type ProductGridProps = {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  const [columns, setColumns] = useState<Product[][]>([[], []])

  useEffect(() => {
    // Distribute products into columns for Pinterest-style layout
    const cols = [[], [], []]
    products.forEach((product, index) => {
      cols[index % cols.length].push(product)
    })
    setColumns(cols)
  }, [products])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-3">
          {column.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
      ))}
    </div>
  )
}
