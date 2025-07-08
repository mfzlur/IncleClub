import React from 'react';
import ReactDOM from 'react-dom/client';

// This is the critical change.
// Ensure your main stylesheet is named "App.css" and is in the "src" folder.
import './App.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
