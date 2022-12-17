import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { initialState } from 'store/database/products';
import store from 'store/store';

import { Home } from 'pages/home/Home';
import { Cart } from 'pages/cart/Cart'; 
import { ProductPage } from 'pages/productPage/ProductPage';
import { Page404 } from 'pages/page404/Page404';

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {initialState.map(item => (
          <Route key={item.id} path={`/products/${item.id}`} element={<ProductPage product={item}/>} />
        ))}
        <Route path='*' element={<Page404 />}/>
      </Routes>
    </Provider>
  );
}