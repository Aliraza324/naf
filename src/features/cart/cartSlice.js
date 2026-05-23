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

export const getCartGroupKey = (item) =>
  [item.productId, item.volumeTier, item.price].join('|')

const getPackagePrice = (item) => item.packagePrice ?? item.unitPrice ?? 0

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
          existingItem.packagePrice = getPackagePrice(item)
          existingItem.totalPrice = existingItem.packagePrice
          return
        }

        state.items.push({
          ...item,
          key,
          packagePrice: getPackagePrice(item),
          totalPrice: getPackagePrice(item),
        })
      })
    },
    increaseCartItemQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.key === action.payload)

      if (item) {
        item.quantity += 1
        item.totalPrice = getPackagePrice(item)
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
      item.totalPrice = getPackagePrice(item)
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter((cartItem) => cartItem.key !== action.payload)
    },
    removeCartItems: (state, action) => {
      const keysToRemove = new Set(action.payload)
      state.items = state.items.filter((cartItem) => !keysToRemove.has(cartItem.key))
    },
    updateCartItemQuantity: (state, action) => {
      const { key, quantity } = action.payload
      const item = state.items.find((cartItem) => cartItem.key === key)

      if (!item) return

      if (quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.key !== key)
        return
      }

      item.quantity = quantity
      item.totalPrice = getPackagePrice(item)
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
  removeCartItems,
  updateCartItemQuantity,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSubtotal = (state) =>
  Object.values(
    state.cart.items.reduce((groups, item) => {
      groups[getCartGroupKey(item)] = getPackagePrice(item)
      return groups
    }, {}),
  ).reduce((total, packagePrice) => total + packagePrice, 0)

export default cartSlice.reducer
