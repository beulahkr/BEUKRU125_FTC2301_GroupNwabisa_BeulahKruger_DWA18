import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppProvider';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

const renderApp = () => (
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);

ReactDOM.createRoot(rootElement).render(renderApp());
