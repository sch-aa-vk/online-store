import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import { Home } from 'pages/home/Home';
import { Cart } from 'pages/cart/Cart'; 
import { ProductPage } from 'pages/productPage/ProductPage';
import { Page404 } from 'pages/page404/Page404';

import './app.css';

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Provider>
  );
}