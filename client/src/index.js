// Import CSS
import './index.css';

// Import Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './ReduxStore.js';

// Import Components
import Navigation from './Navigation/Navigation.js';
import PageBuilder from './PageBuilder/PageBuilder.js';

// Router
const router = createHashRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { 
        path: '/', 
        element: <PageBuilder /> 
      }
    ]
  }
]);

// Render in React Component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);