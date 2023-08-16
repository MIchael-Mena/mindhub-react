import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeConfig } from './config/theme.config.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // El strict mode puede causar que useState se ejecute dos veces
  <React.StrictMode>
    <ThemeConfig>
      <App />
    </ThemeConfig>
  </React.StrictMode>
)
