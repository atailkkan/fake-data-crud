import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import './index.css'
import './assets/css/main.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <HeroUIProvider>
        <App />
    </HeroUIProvider>
)
