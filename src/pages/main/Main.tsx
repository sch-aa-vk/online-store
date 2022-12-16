import React from 'react';
import ProductsList from '../../components/products/ProductsList';
import AscendingSort from '../../functions/ascendingSort/Sort';
import Header from '../../components/header/Header';

import './main.css';

const Home = () => {
  return(
    <div className="app">
      <Header />
      <AscendingSort/>
      <ProductsList/>
    </div>
  );
}

export default Home;