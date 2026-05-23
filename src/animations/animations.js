export const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      y: { type: "spring", stiffness: 70, damping: 16, mass: 0.8 },
      opacity: { duration: 0.4, ease: "easeOut" }
    } 
  }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -12 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      y: { type: "spring", stiffness: 70, damping: 16, mass: 0.8 },
      opacity: { duration: 0.4, ease: "easeOut" }
    } 
  }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      scale: { type: "spring", stiffness: 55, damping: 15, mass: 1 },
      opacity: { duration: 0.5, ease: "easeOut" }
    } 
  }
}

export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
})

export const dropdownMenu = {
  initial: { opacity: 0, scale: 0.95, y: -6 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 280,
      damping: 22,
      mass: 0.8
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -6, 
    transition: { 
      duration: 0.15, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
}

export const mobileNavMenu = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: "auto", 
    opacity: 1, 
    transition: { 
      height: { type: "spring", stiffness: 220, damping: 24 },
      opacity: { duration: 0.2, ease: "linear" }
    } 
  },
  exit: { 
    height: 0, 
    opacity: 0, 
    transition: { 
      height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.12, ease: "linear" }
    } 
  }
}

export const announcementFade = {
  initial: { opacity: 0, y: 6 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.25, ease: "easeIn" }
  }
}

export const toastAnimation = {
  initial: { opacity: 0, y: -15, scale: 0.92, x: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20,
      mass: 0.8
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.92, 
    x: 20, 
    transition: { 
      duration: 0.15, 
      ease: "easeIn" 
    } 
  }
}

