import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Filters } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 

import './home.css';

import search from 'assets/search.svg';
import { setValueChange } from 'store/slices/filters.slice';
import { useAppDispatch } from 'store/store.hooks';

export const Home = () => {

  const dispatch = useAppDispatch();
  const products = useSelector(getProductsSelector);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(setValueChange([value]));
  }, [value]);

  return(
    <>
      <Header />
      <div className='app'>
        <Filters/>
        <div className='products__item-wrapper'>
          <div className='priducts-filters'>
            <p className='priducts-found'>Found: {products.length}</p>
            <form>
              <label className='label-filter'>
                <img src={search} alt="" />
                <input className='input' type='text' placeholder='' onChange={(e) => setValue(e.target.value)} />
              </label>
            </form>
          </div>
          <div className='products__wrapper'>
            {products.length !== 0 
                ? products.map(product =>
                    <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
                  )
                : <>Нет товаров по данным фильтрам</>
            }
                
          </div>
        </div>
      </div>
    </>
  );
}