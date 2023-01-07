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
import { useAppDispatch } from 'store/store.hooks';

export const Home = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const products = useSelector(getProductsSelector);
  const [value, setValue] = useState("");
  const [displayMode, setDisplayMode] = useState('choose display');

  useEffect(() => {
    dispatch(setValueChange([value]));
  }, [value]);

  const handleChange = (newValue: string) => {
    setValue(newValue)
    queryParams.delete('search');
    queryParams.append('search', newValue);
    navigate(`?${queryParams.toString()}`);
  };

  const returnDisplayModeStyle = (displayMode: string) => {
    if (displayMode === 'rows') {
      return 'products__wrapper-rows';
    } else if (displayMode === 'columns') {
      return 'products__wrapper-columns';
    }
    return '';
  };

  const handleDisplaySelect = (option: string) => {
    setDisplayMode(option);
    queryParams.delete('display');
    queryParams.append('display', option);
    navigate(`?${queryParams.toString()}`);
  }

  useEffect(() => {
    if (queryParams.get('search')) {
      let search = queryParams.get('search');
      if (search) {
        setValue(search);
      }
    } 
  }, []);

  return(
    <>
      <Header />
      <div className='app'>
        <Filters/>
        <div className='products__item-wrapper'>
          <div className='priducts-filters'>
            <p className='priducts-found'>Found: {products.length}</p>
            <select value={displayMode} onChange={(e) => handleDisplaySelect(e.target.value)} className='select-sort'>
              <option value="choose display" disabled>Choose display</option>
              <option value="rows">Rows</option>
              <option value="columns">Columns</option>
            </select>
            <form>
              <label className='label-filter'>
                <img src={search} alt="" />
                <input className='input' type='text' value={value} placeholder='' onChange={(e) => handleChange(e.target.value)} />
              </label>
            </form>
          </div>
          <div className={`products__wrapper ${returnDisplayModeStyle(displayMode)}`}>
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