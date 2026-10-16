import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
        role="region"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-luxury border backdrop-blur-md transform transition-all duration-300 animate-slide-up ${
              toast.type === 'success'
                ? 'bg-brand-deep-ocean/95 text-white border-brand-tropical-aqua'
                : toast.type === 'error'
                ? 'bg-brand-deep-ocean/95 text-white border-brand-coral-energy ring-1 ring-brand-coral-energy/40'
                : 'bg-brand-deep-ocean/95 text-white border-brand-ocean-teal'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-brand-tropical-aqua shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-brand-coral-energy shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-brand-ocean-teal shrink-0" />}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white ml-3 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
