import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Using createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
