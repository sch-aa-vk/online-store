import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { initialState } from './components/products/listOfProducts';

import Home from './pages/main/Main';
import Cart from './pages/cart/Cart';
import ProductPage from './pages/product-page/ProductPage';
import store from './functions/store/store';
import { Page404 } from './pages/page404/Page404';

function App() {
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

export default App;
