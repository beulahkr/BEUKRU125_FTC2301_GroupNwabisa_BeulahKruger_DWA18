import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from './FavoritesProvider';
const rootElement = document.getElementById('root');

const renderApp = () => (
  
   <Router>
     <AppProvider>
      <FavoritesProvider>
        <App/>
      </FavoritesProvider>
    </AppProvider>
   </Router>
);

ReactDOM.createRoot(rootElement).render(renderApp());