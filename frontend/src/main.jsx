import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import {Route,RouterProvider,createRoutesFromElements,createBrowserRouter} from 'react-router-dom';
import '../index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);