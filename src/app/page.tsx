'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { setProducts } from '@/store/features/productSlice'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: number
  title: string
  description: string
  price: number
  currency: string
  image: string
  rating: number
}

export default function ProductListing() {
  const dispatch = useAppDispatch()
  
  // mock product data
  const mockProduct: Product = {
    id: 1,
    title: 'Soup',
    description: 'Soup Description',
    price: 10.99,
    currency: 'USD',
    image: 'https://placehold.co/600x400/000000/FFF', // currently using placehold.co for image placeholder
    rating: 3.2
  }

  // use mock data
  useEffect(() => {
    dispatch(setProducts([mockProduct]))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-blue-100 pt-20">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* display a single product card */}
        <div className="grid grid-cols-1 gap-6">
          <ProductCard {...mockProduct} />
        </div>
      </main>
    </div>
  )
}
