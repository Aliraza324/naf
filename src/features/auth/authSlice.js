import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  showWelcomeModal: true, // Show modal on first load
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Show/Hide Welcome Modal
    showWelcomeModal: (state) => {
      state.showWelcomeModal = true
    },
    hideWelcomeModal: (state) => {
      state.showWelcomeModal = false
    },

    // Auth Actions
    loginRequest: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      state.showWelcomeModal = false
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    registerRequest: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      state.showWelcomeModal = false
    },
    registerFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.loading = false
    },

    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },

    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  showWelcomeModal,
  hideWelcomeModal,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
  updateUserProfile,
  clearError,
} = authSlice.actions

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error
export const selectShowWelcomeModal = (state) => state.auth.showWelcomeModal

export default authSlice.reducer
