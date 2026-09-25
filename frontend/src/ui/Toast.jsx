import { createContext, useCallback, useContext, useState } from 'react'

const ToastCtx = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((text, tone = 'good') => {
    const key = crypto.randomUUID()
    setToasts((list) => [...list, { key, text, tone }])
    setTimeout(() => setToasts((list) => list.filter((t) => t.key !== key)), 3500)
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.key} className={`toast toast--${t.tone}`}>
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export const useToast = () => useContext(ToastCtx)
