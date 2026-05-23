const TOAST_EVENT = 'NAF-toast'

const emitToast = (message, statusCode, duration = 3000) => {
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: { message, statusCode, autoRemoveTime: duration },
    }),
  )
}

const toast = {
  success: (message, duration) => emitToast(message, 'success', duration),
  error: (message, duration) => emitToast(message, 'error', duration),
  warning: (message, duration) => emitToast(message, 'no-response', duration),
}

export default toast
