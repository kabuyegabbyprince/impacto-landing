import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './locales/i18n';
import './index.css';

// Prevent injected wallet providers from attempting unsolicited connections
if (typeof window !== 'undefined') {
  (window as any).ethereum = undefined;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
