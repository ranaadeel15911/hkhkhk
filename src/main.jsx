import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {  GoogleOAuthProvider } from "@react-oauth/google";
const clientId = import.meta.env.VITE_CLIENT_ID;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
