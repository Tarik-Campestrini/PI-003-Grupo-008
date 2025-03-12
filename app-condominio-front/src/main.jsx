import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './styles/global'
import RoutesApp from './routes'
import { AuthProvider } from './contexts/auth';   

createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <RoutesApp />
    <GlobalStyle />
  </AuthProvider>
 
)
