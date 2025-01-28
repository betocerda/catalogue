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
      // sets diferent list for products and filtered, they start out the same
      state.products = action.payload
      state.filteredProducts = action.payload
    },

    // this reducer sets the search term, and filters the products
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredProducts = state.products.filter((product: { title: string }) => 
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    // sorts by price or by rating
    setSortBy: (state, action: PayloadAction<'price' | 'rating' | null>) => {
      state.sortBy = action.payload;
      // if price is selected, sort by price ascending
      if (action.payload === 'price') {
        state.filteredProducts.sort((a: { price: number }, b: { price: number }) => a.price - b.price);
      
      // if rating is selected sort by rating descending
      } else if (action.payload === 'rating') {
        state.filteredProducts.sort((a: { rating: number }, b: { rating: number }) => b.rating - a.rating);
      }
    },
    // state for pagination, updates the current page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export const { setProducts, setSearchTerm, setSortBy, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;