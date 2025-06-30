// Main React imports - these are required for any React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Find the 'root' div in public/index.html and create a React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire app inside React.StrictMode (helps catch bugs during development)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 