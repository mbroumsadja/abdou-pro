"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/lib/types"
import { Upload, X, Camera } from "lucide-react"

type ImageSearchProps = {
  onImageUpload: (file: File) => void
  searchResults: Product[]
  onProductClick: (product: Product) => void
  isSearching: boolean
}

export function ImageSearch({ onImageUpload, searchResults, onProductClick, isSearching }: ImageSearchProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image")
      return
    }

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)

    // Pass the file to parent for processing
    onImageUpload(file)
  }

  const clearImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="pb-4">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 shadow-sm">
        <h1 className="text-xl font-bold text-rose-500 mb-2">Recherche par Image</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Téléchargez une image pour trouver des produits similaires
        </p>
      </header>

      <main className="p-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center transition-colors ${
            isDragging ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20" : "border-gray-300 dark:border-gray-700"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Image téléchargée"
                className="max-h-64 mx-auto rounded-lg object-contain"
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 bg-gray-800/70 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="py-8">
              <div className="flex justify-center mb-4">
                <Upload size={48} className="text-gray-400" />
              </div>
              <p className="mb-4">Glissez et déposez une image ici</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">ou</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-rose-500 text-white px-4 py-2 rounded-full inline-flex items-center"
              >
                <Camera size={18} className="mr-2" />
                Sélectionner une image
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          )}
        </div>

        {isSearching && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Analyse de l'image en cours...</p>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Produits suggérés</h2>
            <ProductGrid products={searchResults} onProductClick={onProductClick} />
          </>
        )}

        {!isSearching && selectedImage && searchResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Aucun produit trouvé. Essayez avec une autre image.</p>
          </div>
        )}
      </main>
    </div>
  )
}
