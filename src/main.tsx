import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast';

//import Doc from './Doc'
//import Newapp from './Newapp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="top-center" />
    {/* <Doc name='Bodhesh' age={22}/> */}
    {/* <Newapp/> */}
  </StrictMode>,
)
