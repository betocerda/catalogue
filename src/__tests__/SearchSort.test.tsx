import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchSort from '@/components/SearchSort'
import productReducer from '@/store/features/productSlice'

describe('SearchSort', () => {
  const store = configureStore({
    reducer: {
      products: productReducer
    }
  })

  it('updates search term when typing', () => {
    render(
      <Provider store={store}>
        <SearchSort />
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    const state = store.getState()
    expect(state.products.searchTerm).toBe('test')
  })

  it('updates sort option when selected', () => {
    render(
      <Provider store={store}>
        <SearchSort />
      </Provider>
    )

    const sortSelect = screen.getByRole('combobox')
    fireEvent.change(sortSelect, { target: { value: 'price' } })
    
    const state = store.getState()
    expect(state.products.sortBy).toBe('price')
  })
})