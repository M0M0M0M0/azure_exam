import React from 'react'
import ReactDOM from 'react-dom/client'
import Shell from './Shell'
import { ToastProvider } from './ui/Toast'
import './theme.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ToastProvider>
      <Shell />
    </ToastProvider>
  </React.StrictMode>
)
