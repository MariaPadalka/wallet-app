import { config } from '@fortawesome/fontawesome-svg-core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'

config.autoAddCss = false
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
