import React from 'react';
import './App.css';
import ProductsList from './products/ProductsList';
import Cart from './cart/cart';
import AscendingSort from './ascendingSort/AscendingSort';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className='header'>
          <Cart/>
        </header>
        <AscendingSort/>
        <ProductsList/>
        
      </div>
    </Provider>
  );
}

export default App;
