import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filters } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 

import './home.css';

import search from 'assets/search.svg';
import { setValueChange } from 'store/slices/filters.slice';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';

export function returnDisplayModeStyle (displayMode: string) {
  if (displayMode === 'rows') {
    return 'row';
  }
  return 'column';
};

export const Home = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const products = useSelector(getProductsSelector);
  const [displayMode, setDisplayMode] = useState('choose display');
  const [searchValue] = useAppSelector((state) => state.filters.value);

  const handleChange = (newValue: string) => {
    dispatch(setValueChange([newValue]));
    queryParams.delete('search');
    queryParams.append('search', newValue);
    navigate(`?${queryParams.toString()}`, {replace: true});
  };

  const handleDisplaySelect = (option: string) => {
    setDisplayMode(option);
    queryParams.delete('display');
    queryParams.append('display', option);
    navigate(`?${queryParams.toString()}`, {replace: true});
  }

  useEffect(() => {
    if (queryParams.get('search')) {
      let search = queryParams.get('search');
      if (search) {
        dispatch(setValueChange([search]));
      }
    }
    if (queryParams.get('display')) {
      let display = queryParams.get('display');
      if (display) {
        setDisplayMode(display);
      }
    } 
  }, []);

  return(
    <>
      <div className='app'>
        <Filters/>
        <div className='products__item-wrapper'>
          <div className='products-filters'>
            <p className='products-found'>Found: {products.length}</p>
            <select value={displayMode} onChange={(e) => handleDisplaySelect(e.target.value)} className='select-sort'>
              <option value="choose display" disabled>Choose display</option>
              <option value="rows">Rows</option>
              <option value="columns">Columns</option>
            </select>
            <form>
              <label className='label-filter'>
                <img src={search} alt="" />
                <input className='input' type='text' value={searchValue} placeholder='' onChange={(e) => handleChange(e.target.value)} />
              </label>
            </form>
          </div>
          <div className={`products__wrapper ${returnDisplayModeStyle(displayMode)}`}>
            {products.length !== 0 
                ? products.map(product =>
                    <ProductCard key={product.id} mode={returnDisplayModeStyle(displayMode)} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
                  )
                : <p>Products not found</p>
            }
          </div>
        </div>
      </div>
    </>
  );
}