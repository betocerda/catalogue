import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import ProductCard from '@/components/ProductCard'
import cartReducer from '@/store/features/cartSlice'

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'This is a test product description that is longer than 100 characters so we can test the truncation functionality properly',
    price: 99.99,
    currency: 'USD',
    rating: 4,
    image: '/test-image.jpg'
  }

  const store = configureStore({
    reducer: {
      cart: cartReducer
    }
  })

  it('renders product information correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(/This is a test product/)).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByAltText('Test Product')).toBeInTheDocument()
  })

  it('truncates description to 100 characters', () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    )

    const description = screen.getByText(/This is a test product/)
    expect(description.textContent?.length).toBeLessThanOrEqual(103) // 100 chars + '...'
  })

  it('displays correct number of filled stars based on rating', () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    )

    const filledStars = screen.getAllByTestId('filled-star')
    expect(filledStars).toHaveLength(4)
  })

  it('adds product to cart when button is clicked', () => {
    render(
      <Provider store={store}>
        <ProductCard {...mockProduct} />
      </Provider>
    )

    fireEvent.click(screen.getByText('Add to Cart'))
    const state = store.getState()
    expect(state.cart.items).toHaveLength(1)
    expect(state.cart.items[0].id).toBe(1)
  })
})