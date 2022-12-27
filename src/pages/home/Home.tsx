import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Filters } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 

import './home.css';

import search from 'assets/search.svg';
import { IProduct } from 'store/interface/IProduct';

export const Home = () => {

  const products = useSelector(getProductsSelector);
  const [value, setValue] = useState("");
  const [filterItems, setFilterItems] = useState([] as IProduct[]);

  useEffect(() => {
    if (products) {
      console.log("products useEffect");
      setFilterItems(products.filter(item => 
        item.brand.toLowerCase().includes(value.toLowerCase()) || item.category.toLowerCase().includes(value.toLowerCase()) ||
        item.title.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.price.toString().includes(value) || item.discountPercentage.toString().includes(value) ||
        item.rating.toString().includes(value) || item.stock.toString().includes(value)
      ));
    }
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
            {filterItems.map(product =>
              <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
            )}
          </div>
        </div>
      </div>
    </>
  );
}