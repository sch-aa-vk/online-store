import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store/store';

import { Home } from 'pages/home/Home';
import { Cart } from 'pages/cart/Cart'; 
import { ProductPage } from 'pages/productPage/ProductPage';
import { Page404 } from 'pages/page404/Page404';

import './app.css';
import { initialState } from 'store/database/products';

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        {initialState.map(item => (
          <Route key={item.id} path={`/products/${item.id}`} element={<ProductPage id={item.id} title={''} description={''} price={0} discountPercentage={0} rating={0} stock={0} brand={''} category={''} thumbnail={''} images={[]} amount={0}/>} />
        ))}
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Provider>
  );
}