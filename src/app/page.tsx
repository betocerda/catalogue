'use client'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setProducts, setCurrentPage } from '@/store/features/productSlice'
import ProductCard from '@/components/ProductCard'
import Header from '@/components/Header'

// To do: 
// * add header with current price total - Done
// * add cart function to ProductCard - Done
// * add search and sorting

export default function ProductListing() {
  const dispatch = useAppDispatch()
  const { filteredProducts, currentPage, itemsPerPage } = useAppSelector(state => state.products)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

// configure intersection observer with threshold
const { ref, inView } = useInView({
  threshold: 0,
  triggerOnce: false
})

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // first try the local API route
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      
      if (!data.products) {
        throw new Error('Invalid data format')
      }
      
      dispatch(setProducts(data.products))
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
      
      // fallback to direct API call if local route fails
      try {
        const directResponse = await fetch('https://my-json-server.typicode.com/aylin-vdo/Greyball-challenge-json/products')
        if (!directResponse.ok) {
          throw new Error('Failed to fetch from direct API')
        }
        const directData = await directResponse.json()
        dispatch(setProducts(directData))
        setError(null)
      } catch (directError) {
        console.error('Direct API Error:', directError)
        setError('Failed to fetch products from all sources')
      }
    } finally {
      setIsLoading(false)
    }
  }

  fetchProducts()
}, [dispatch])

// handle infinite scroll
useEffect(() => {
  if (inView && !isLoading) {
    const totalItems = filteredProducts?.length || 0
    const currentlyDisplayed = currentPage * itemsPerPage
    
    if (currentlyDisplayed < totalItems) {
      dispatch(setCurrentPage(currentPage + 1))
    }
  }
}, [inView, isLoading, currentPage, itemsPerPage, filteredProducts?.length, dispatch])

if (isLoading && currentPage === 1) {
  return (
    <div className="min-h-screen bg-blue-100 pt-20">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </main>
    </div>
  )
}

if (error) {
  return (
    <div className="min-h-screen bg-blue-100 pt-20">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </main>
    </div>
  )
}

const displayedProducts = Array.isArray(filteredProducts)
  ? filteredProducts.slice(0, currentPage * itemsPerPage)
  : []

return (
  <div className="min-h-screen bg-blue-100 pt-20">
    <Header />
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      
      {/* loading indicator for next page */}
      {isLoading && currentPage > 1 && (
        <div className="text-center py-4">
          Loading more products...
        </div>
      )}
      
      {/* intersection observer target */}
      {displayedProducts.length < (filteredProducts?.length || 0) && (
        <div ref={ref} className="h-10 mt-4" />
      )}
    </main>
  </div>
)
}