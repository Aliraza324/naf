import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
}

const cartPersistConfig = {
  key: 'cart',
  storage,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['showWelcomeModal', 'loading', 'error'],
}

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
}

export const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartReducer),
    auth: persistReducer(authPersistConfig, authReducer),
    wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
