import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/main/Main';
import Cart from './pages/cart/Cart';
import store from './functions/store/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
