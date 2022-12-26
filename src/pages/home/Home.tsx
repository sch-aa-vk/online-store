import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AscendingSort } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 
import RangeSlider from 'components/rangeSlider/rangeSlider';

import './home.css';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { brandHandler, categoryHandler, filters, resetFilters, setBrands, setCategories, setPriceRange } from 'store/slices/filters.slice';
import { initialState } from 'store/database/products';
import { useLocation, useNavigate } from 'react-router-dom';
import { IProduct } from 'store/interface/IProduct'; 

export const Home = () => {

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector((state) => state.filters.brands);
  const selectedCategories = useAppSelector((state) => state.filters.categories);
  const priceRange = useAppSelector((state) => state.filters.priceRange);

  // const [products, setProducts] = useState(useSelector(getProductsSelector));

  const products = useSelector(getProductsSelector);
  const [value, setValue] = useState("");
  const [brandList, setBrandList] = useState(Array.from(new Set(initialState.map(item => item.brand))));
  const [categoryList, setCategoryList] = useState(Array.from(new Set(initialState.map(item => item.category))));
  // const brandList = Array.from(new Set(initialState.map(item => item.brand)));
  // const categoryList = Array.from(new Set(initialState.map(item => item.category)));

  const setCategoriesArray = (categories: string[]) => dispatch(setCategories(categories));
  const setBrandsArray = (categories: string[]) => dispatch(setBrands(categories));
  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));
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

  useEffect(() => {
    if (products) {
      console.log("products2 useEffect");
      setFilterItems(products);
    }
  }, [selectedBrands, selectedCategories, priceRange, products]);

  useEffect(() => {
    if (filterItems && filterItems.length) {
      console.log(filterItems);
      setMinPrice(filterItems.reduce((prev, cur) => prev.price < cur.price ? prev : cur).price);
      setMaxPrice(filterItems.reduce((prev, cur) => prev.price > cur.price ? prev : cur).price);
      console.log(filterItems.reduce((prev, cur) => prev.price < cur.price ? prev : cur).price);
    }
  }, [filterItems]);

  useEffect(() => {
    dispatch(setPriceRange([minPrice, maxPrice]));
  }, [minPrice, maxPrice]);

  return(
    <div className="app">
      <Header />
      <AscendingSort/>
      <div>
        Reset all filters
        <button onClick={filtersReset}>Reset</button>
      </div>
      <div>
        Copy url
        <button onClick={() => {navigator.clipboard.writeText(window.location.href)}}>Copy</button>
      </div>
      <div>
        <h2>Brands</h2>
        {brandList.map(brand => 
          <label key={brand}>
            <input checked={selectedBrands.includes(brand)} key={brand} onChange={(e) => brandSelect({ brand: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} type="checkbox" name={brand} id={brand.replace(" ", "")} />
            {`${brand}  (${products.filter(product => product.brand === brand).length}/${initialState.filter(product => product.brand === brand).length})`}
          </label>
        )}
      </div>
      <div>
        <h2>Category</h2>
        {categoryList.map(category => 
          <label key={category}>
            <input checked={selectedCategories.includes(category)} key={category} onChange={(e) => categorySelect({ category: (e.target as HTMLInputElement).name, checked: (e.target as HTMLInputElement).checked })} type="checkbox" name={category} id={category.replace(" ", "")} />
            {`${category}  (${products.filter(product => product.category === category).length}/${initialState.filter(product => product.category === category).length})`}
          </label>
        )}
      </div>
      <h5>found: {products.length}</h5>
      <form>
        <input type="text" placeholder="..." onChange={(e) => setValue(e.target.value)} />
      </form>
      <RangeSlider max={maxPrice} min={minPrice}></RangeSlider>
      <h2 className='products__title'>Products</h2>
      <div className='products__item-wrapper'>
        {filterItems.map(product =>
          <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
        )}
      </div>
    </div>
  );
}