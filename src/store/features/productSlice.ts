import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// structure of product
interface Product {
  id: number
  title: string
  description: string
  price: number
  currency: string
  image: string
  rating: number
}

// structure of managing products
interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  searchTerm: string
  sortBy: 'price' | 'rating' | null
  currentPage: number
  itemsPerPage: number
}

// default values
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  searchTerm: '',
  sortBy: null,
  currentPage: 1,
  itemsPerPage: 10
}

// slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // this reducer sets the list of products in the state
    setProducts: (state, action: PayloadAction<Product[]>) => {
      const products = Array.isArray(action.payload) ? action.payload : []
      // sets diferent list for products and filtered, they start out the same
      state.products = products
      state.filteredProducts = products
      // reset other state values when setting new products
      state.currentPage = 1
      state.searchTerm = ''
      state.sortBy = null
    },

    // this reducer sets the search term, and filters the products
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      if (Array.isArray(state.products)) {
        state.filteredProducts = state.products.filter((product) => 
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        )
        // apply current sort after filtering
        if (state.sortBy === 'price') {
          state.filteredProducts.sort((a, b) => a.price - b.price)
        } else if (state.sortBy === 'rating') {
          state.filteredProducts.sort((a, b) => b.rating - a.rating)
        }
      } else {
        state.filteredProducts = []
      }
      // reset to first page when searching
      state.currentPage = 1
    },

    // sorts by price or by rating
    setSortBy: (state, action: PayloadAction<'price' | 'rating' | null>) => {
      state.sortBy = action.payload
      if (Array.isArray(state.filteredProducts)) {
        // if price is selected, sort by price ascending
        if (action.payload === 'price') {
          state.filteredProducts = [...state.filteredProducts].sort((a, b) => a.price - b.price)
        
        // if rating is selected sort by rating descending
        } else if (action.payload === 'rating') {
          state.filteredProducts = [...state.filteredProducts].sort((a, b) => b.rating - a.rating)
        }
      }
    },

    // state for pagination, updates the current page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      // check page number is valid
      state.currentPage = Math.max(1, action.payload)
    }
  }
})

export const { setProducts, setSearchTerm, setSortBy, setCurrentPage } = productSlice.actions
export default productSlice.reducer