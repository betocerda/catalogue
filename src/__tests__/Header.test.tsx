import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Header from '@/components/Header'
import cartReducer from '@/store/features/cartSlice'

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    currency: string;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

describe('Header', () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    }
  })

  it('renders cart information correctly', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )

    expect(screen.getByText(/Items:/)).toBeInTheDocument()
    expect(screen.getByText(/Total:/)).toBeInTheDocument()
  })

  it('displays correct cart totals', () => {
    const preloadedState = {
      cart: {
        items: [
          { 
            id: 1, 
            title: 'Test', 
            price: 10, 
            quantity: 2,
            currency: 'USD'
          }
        ],
        totalItems: 2,
        totalPrice: 20
      } as CartState
    }

    const storeWithState = configureStore({
      reducer: { cart: cartReducer },
      preloadedState
    })

    render(
      <Provider store={storeWithState}>
        <Header />
      </Provider>
    )

    expect(screen.getByText('Items: 2')).toBeInTheDocument()
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument()
  })
})