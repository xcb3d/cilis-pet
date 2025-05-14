import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/femininestyle.css'
import App from './App.jsx'
import { initializeAllAnimations } from './utils/animations'

// Initialize animations
initializeAllAnimations();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
