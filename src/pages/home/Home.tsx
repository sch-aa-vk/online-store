import React from 'react';
import { useSelector } from 'react-redux';
import { AscendingSort } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 

import './home.css';

export const Home = () => {

  const products = useSelector(getProductsSelector);

  return(
    <div className="app">
      <Header />
      <AscendingSort/>
       <h2 className='products__title'>Products</h2>
      <div className='products__item-wrapper'>
        {products.map(product =>
          <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
        )}
      </div>
    </div>
  );
}
