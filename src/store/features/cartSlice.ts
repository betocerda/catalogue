import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// structure of cart item
interface CartItem {
  id: number
  title: string
  price: number
  currency: string
  quantity: number
}

// total items, price and list
interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

// default values
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // this reducer adds an item to the cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // increase quantity of an existing item
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems += 1;
      state.totalPrice += action.payload.price;
    },
    // this reducer removes an item from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      // check if it exists
      if (item) {
        // then decrease total price and quantity
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        // then remove it from the array
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
