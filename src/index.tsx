import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import themes from 'devextreme/ui/themes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/PWA">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('https://www.bsv-th-authorities.com/PWA/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
        window.parent.postMessage('Congrats! Register Successfully', '*');
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
        window.parent.postMessage("Register Failed", '*');
      });
  });
}

reportWebVitals();
