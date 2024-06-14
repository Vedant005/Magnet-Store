import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from './contexts/productContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
    <App />
    </ProductProvider>
    </Router>
  </React.StrictMode>,
)
