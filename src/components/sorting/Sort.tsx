import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { sortProducts } from 'store/slices/products.slice';
import { initialState } from 'store/database/products';
import { getProductsSelector } from 'store/slices/products.slice';
import { brandHandler, categoryHandler, resetFilters, setBrands, setCategories, setPriceRange } from 'store/slices/filters.slice';
import { IProduct } from 'store/interface/IProduct'; 

import './sort.css';

import { RangeSlider } from 'components/rangeSlider/rangeSlider';


export const Filters: React.FC = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleSortSelect = (option: string) => dispatch(sortProducts(option));

  const [brandList] = useState(Array.from(new Set(initialState.map(item => item.brand))));
  const [categoryList] = useState(Array.from(new Set(initialState.map(item => item.category))));
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const products = useSelector(getProductsSelector);
  const [filterItems, setFilterItems] = useState([] as IProduct[]);

  const setCategoriesArray = (categories: string[]) => dispatch(setCategories(categories));
  const setBrandsArray = (categories: string[]) => dispatch(setBrands(categories));
  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));

  const selectedBrands = useAppSelector((state) => state.filters.brands);
  const selectedCategories = useAppSelector((state) => state.filters.categories);
  const priceRange = useAppSelector((state) => state.filters.priceRange);

  const filtersReset = () => dispatch(resetFilters());

  useEffect(() => {
    if (queryParams.getAll('categories').length) {
      setCategoriesArray(queryParams.getAll('categories'));
    }
    if (queryParams.getAll('brands').length) {
      setBrandsArray(queryParams.getAll('brands'));
    }
    if (queryParams.get('price')) {
      let price = queryParams.get('price');
      let priceArr: number[];
      if (price) {
        priceArr = price.split('-').map((elem) => +elem);
        dispatch(setPriceRange(priceArr));
      }
    }
  }, []);

  useEffect(() => {
    if (filterItems && filterItems.length) {
      setMinPrice(filterItems.reduce((prev, cur) => prev.price < cur.price ? prev : cur).price);
      setMaxPrice(filterItems.reduce((prev, cur) => prev.price > cur.price ? prev : cur).price);
    }
  }, [filterItems]);

  useEffect(() => {
    dispatch(setPriceRange([minPrice, maxPrice]));
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (selectedBrands) {
      queryParams.delete('brands');
      for (let i = 0; i < selectedBrands.length; i++) {
        queryParams.append('brands', selectedBrands[i]);
      }
      navigate(`?${queryParams.toString()}`);
    }
  }, [selectedBrands]);

  useEffect(() => {
    if (selectedCategories) {
      queryParams.delete('categories');
      for (let i = 0; i < selectedCategories.length; i++) {
        queryParams.append('categories', selectedCategories[i]);
      }
      navigate(`?${queryParams.toString()}`);
    }
  }, [selectedCategories]);

  useEffect(() => {
    queryParams.delete('price');
    if (priceRange && priceRange.length) {
      if (priceRange[0] !== 0 && priceRange[1] !== 0) {
        queryParams.append('price', priceRange.join('-'));
        navigate(`?${queryParams.toString()}`);
      }
    }
  }, [priceRange]);

  useEffect(() => {
    setFilterItems(products);
  }, [selectedBrands, selectedCategories, priceRange, products]);

  return (
    <>
      <div className='filters__wrapper'>
        <div>
          <RangeSlider max={maxPrice} min={minPrice}></RangeSlider>
        </div>
        <div className='select-sort__wrapper'>
          <select onChange={(e) => handleSortSelect(e.target.value)} className='select-sort'>
            <option value="placeholder">Choose sort</option>
            <option value="big ratings first">Big ratings first</option>
            <option value="low ratings first">Low ratings first</option>
            <option value="big price first">Big price first</option>
            <option value="low price first">Low price first</option>
            <option value="big discount first">Big discount first</option>
            <option value="low discount first">Low discount first</option>
          </select>
        </div>
        <div>
          <h2>Brands</h2>
          <div className='div__container'>
            {brandList.map(brand => 
              <label className='label' key={brand}>
                <input checked={selectedBrands.includes(brand)} key={brand} onChange={(e) => brandSelect({ brand: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} type="checkbox" name={brand} id={brand.replace(" ", "")} />
                {`${brand}  (${products.filter(product => product.brand === brand).length}/${initialState.filter(product => product.brand === brand).length})`}
              </label>
            )}
          </div>
        </div>
        <div>
          <h2>Category</h2>
          <div className='div__container'>
            {categoryList.map(category => 
              <label className='label' key={category}>
                <input checked={selectedCategories.includes(category)} key={category} onChange={(e) => categorySelect({ category: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} type="checkbox" name={category} id={category.replace(" ", "")} />
                {`${category}  (${products.filter(product => product.category === category).length}/${initialState.filter(product => product.category === category).length})`}
              </label>
            )}
          </div>
        </div>
        <button onClick={filtersReset}>Reset Filters</button>
        <button onClick={() => {navigator.clipboard.writeText(window.location.href)}}>Copy URL</button>
      </div>
    </>
  )
}