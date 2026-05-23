import { createSlice } from '@reduxjs/toolkit'

const getCartItemKey = (item) =>
  [
    item.productId,
    item.color,
    item.size || '',
    item.volumeTier,
    item.variants?.pack || '',
  ].join('|')

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      action.payload.forEach((item) => {
        const key = getCartItemKey(item)
        const existingItem = state.items.find((cartItem) => cartItem.key === key)

        if (existingItem) {
          existingItem.quantity += item.quantity
          existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice
          return
        }

        state.items.push({
          ...item,
          key,
          totalPrice: item.quantity * item.unitPrice,
        })
      })
    },
    increaseCartItemQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.key === action.payload)

      if (item) {
        item.quantity += 1
        item.totalPrice = item.quantity * item.unitPrice
      }
    },
    decreaseCartItemQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.key === action.payload)

      if (!item) return

      if (item.quantity <= 1) {
        state.items = state.items.filter((cartItem) => cartItem.key !== action.payload)
        return
      }

      item.quantity -= 1
      item.totalPrice = item.quantity * item.unitPrice
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((cartItem) => cartItem.key !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addItemsToCart,
  clearCart,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.totalPrice, 0)

export default cartSlice.reducer
