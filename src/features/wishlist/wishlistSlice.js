import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload
      const exists = state.items.find((p) => p.id === product.id)
      if (!exists) state.items.push(product)
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((p) => p.id !== id)
    },
    toggleWishlist: (state, action) => {
      const product = action.payload
      const exists = state.items.find((p) => p.id === product.id)
      if (exists) state.items = state.items.filter((p) => p.id !== product.id)
      else state.items.push(product)
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistCount = (state) => state.wishlist.items.length

export default wishlistSlice.reducer
