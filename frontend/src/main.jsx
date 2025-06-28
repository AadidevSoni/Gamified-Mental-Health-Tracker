import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import {Route,RouterProvider,createRoutesFromElements,createBrowserRouter} from 'react-router-dom';
import '../index.css';
import { Provider } from 'react-redux';
import store from './pages/redux/store.js'

//Auth
import Login from './pages/auth/Login.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store}>
    <RouterProvider router={router} />
  </Provider>
);