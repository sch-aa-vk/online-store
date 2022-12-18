import React from 'react';
import { useSelector } from 'react-redux';
import { AscendingSort } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 

import './home.css';
import { useAppDispatch } from 'store/store.hooks';
import { brandHandler } from 'store/slices/filters.slice';

export const Home = () => {

  const dispatch = useAppDispatch();

  const products = useSelector(getProductsSelector);
  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));

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
      <div>
        <h2>Brands</h2>
        {/* TODO: add hardcoded values for now, parse them from database object in the future */}
        <input onClick={(e) => brandSelect( {brand: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked} )} type="checkbox" name="Apple" id="Apple" /><label htmlFor="Apple">Apple</label>
      </div>
    </div>
  );
}
