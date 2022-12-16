import React from 'react';
import { useSelector } from 'react-redux';
import { getProductsSelector } from './products.slice';
import ProductCard from '../product-card/ProductCard';

import './ProductsList.css';

const ProductsList = () => {
  
  const products = useSelector(getProductsSelector);

  return (
    <div className='products'>
      <h2 className='products__title'>Products</h2>
      <div className='products__item-wrapper'>
        {products.map(product =>
          <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
        )}
      </div>
    </div>
  );
}

export default ProductsList;