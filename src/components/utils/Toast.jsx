import { useState, useEffect, useCallback } from "react";
import {
  CircleAlert,
  CheckCircle,
  X,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toastAnimation } from "../../animations/animations";

// --- Global toast trigger using window events (survives HMR) ---
const TOAST_EVENT = "NAF-toast";

const Toast = {
  success: (message, duration = 3000) => {
    console.log("🟢 toast.success called:", message);
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, {
      detail: { message, statusCode: "success", autoRemoveTime: duration },
    }));
  },
  error: (message, duration = 3000) => {
    console.log("🔴 toast.error called:", message);
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, {
      detail: { message, statusCode: "error", autoRemoveTime: duration },
    }));
  },
  warning: (message, duration = 3000) => {
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, {
      detail: { message, statusCode: "no-response", autoRemoveTime: duration },
    }));
  },
};

export default Toast;

// --- Toast UI Component ---
const getToastConfig = (status) => {
  switch (status) {
    case "success":
      return {
        bgColor: "bg-[#C4F4D0]",
        borderColor: "border-[#C4F4D0]",
        textColor: "text-gray-700",
        icon: <CheckCircle size={20} className="text-green-600" />,
      };
    case "no-response":
      return {
        bgColor: "bg-[#FFDFFD]",
        borderColor: "border-[#FFDFFD]",
        textColor: "text-gray-700",
        icon: <XCircle size={20} className="text-pink-500" />,
      };
    case "error":
      return {
        bgColor: "bg-[#F9CDCD]",
        borderColor: "border-[#F9CDCD]",
        textColor: "text-gray-700",
        icon: <CircleAlert size={20} className="text-red-600" />,
      };
    default:
      return {
        bgColor: "bg-[#C4F4D0]",
        borderColor: "border-[#C4F4D0]",
        textColor: "text-gray-700",
        icon: <CheckCircle size={20} className="text-green-600" />,
      };
  }
};

// --- ToastProvider (mount once in App) ---
export function ToastProvider() {
  const [data, setData] = useState(null);
  const handleClose = useCallback(() => setData(null), []);

  useEffect(() => {
    console.log("✅ ToastProvider mounted, listening for events");
    const handler = (e) => {
      console.log("📨 Toast event received:", e.detail);
      setData(e.detail);
    };
    window.addEventListener(TOAST_EVENT, handler);
    return () => window.removeEventListener(TOAST_EVENT, handler);
  }, []);

  const config = data ? getToastConfig(data.statusCode) : null;

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <AnimatePresence>
        {data && (
          <motion.div
            key={data.message}
            variants={toastAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`relative ${config.bgColor} ${config.borderColor} border rounded-lg h-[50px] min-w-[200px] max-w-[400px] w-fit shadow-lg`}
            style={{ padding: "12px 24px 12px 16px" }}
          >
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white"></div>

            <button
              onClick={handleClose}
              className={`absolute -top-2 -right-2 w-6 h-6 ${config.bgColor} border-2 border-white rounded-full flex items-center justify-center text-gray-600 hover:opacity-70 transition-opacity z-10`}
            >
              <X size={14} />
            </button>

            <div className="flex items-center gap-3 h-full">
              <div className="flex-shrink-0">{config.icon}</div>
              <p className={`${config.textColor} font-medium text-sm flex-1 truncate leading-tight`}>
                {data.message}
              </p>
            </div>
            <AutoClose duration={data.autoRemoveTime} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AutoClose({ duration, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  return null;
}
