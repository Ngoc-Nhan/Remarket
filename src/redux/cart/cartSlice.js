// ...existing code...
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [] // { id, product, quantity }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload
      const id =
        product.id ??
        product._id ??
        product.idProduct ??
        String(product.title).slice(0, 40)
      const existing = state.items.find((it) => it.id === id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ id, product, quantity })
      }
    },
    removeFromCart(state, action) {
      const id = action.payload
      state.items = state.items.filter((it) => it.id !== id)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find((it) => it.id === id)
      if (item) item.quantity = Math.max(1, quantity)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
// ...existing code...
