import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { sortProducts } from 'store/slices/products.slice';
import { initialState } from 'store/database/products';
import { getProductsSelector, getUnfilteredProducts } from 'store/slices/products.slice';
import { brandHandler, categoryHandler, resetFilters, setBrands, setCategories, setPriceRange, setStockRange } from 'store/slices/filters.slice';
import { IProduct } from 'store/interface/IProduct'; 
import { setValueChange } from 'store/slices/filters.slice';

import './sort.css';

import { RangeSlider } from 'components/rangeSlider/rangeSlider';


export const Filters: React.FC = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleSortSelect = (option: string) => {
    setSelectValue(option);
    queryParams.delete('sort');
    queryParams.append('sort', option);
    navigate(`?${queryParams.toString()}`);
    dispatch(sortProducts(option));
  }

  const [brandList] = useState(Array.from(new Set(initialState.map(item => item.brand))));
  const [categoryList] = useState(Array.from(new Set(initialState.map(item => item.category))));
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [stockValue, setStockValue] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [maxStock, setMaxStock] = useState(0);
  const [selectValue, setSelectValue] = useState('choose sort');
  const [copyURLText, setCopyURLText] = useState('Copy URL');

  const products = useSelector(getProductsSelector);
  const unfilteredProducts = useSelector(getUnfilteredProducts);
  const [filterItems, setFilterItems] = useState([] as IProduct[]);

  const setCategoriesArray = (categories: string[]) => dispatch(setCategories(categories));
  const setBrandsArray = (categories: string[]) => dispatch(setBrands(categories));
  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));

  const selectedBrands = useAppSelector((state) => state.filters.brands);
  const selectedCategories = useAppSelector((state) => state.filters.categories);
  const priceRange = useAppSelector((state) => state.filters.priceRange);
  const stockRange = useAppSelector((state) => state.filters.stockRange);

  const filtersReset = () => {
    dispatch(resetFilters());
    dispatch(setValueChange(['']));
    setStockValue([minStock, maxStock]);
    setPriceValue([minPrice, maxPrice]);
    setSelectValue('choose sort');
    dispatch(sortProducts('choose sort'));
    navigate('/');
  }

  const copyURLHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyURLText('Copied!');
    setTimeout(() => {
      setCopyURLText('Copy URL');
    }, 1000);
  }

  useEffect(() => {
    if (queryParams.getAll('categories').length) {
      setCategoriesArray(queryParams.getAll('categories'));
    }
    if (queryParams.getAll('brands').length) {
      setBrandsArray(queryParams.getAll('brands'));
    }
    // check if unfilteredProducts exists and is not empty
    if (unfilteredProducts && unfilteredProducts.length) {
      // find min price and max price
      setMinPrice(unfilteredProducts.reduce((prev, cur) => prev.price < cur.price ? prev : cur).price);
      setMaxPrice(unfilteredProducts.reduce((prev, cur) => prev.price > cur.price ? prev : cur).price);
      // find min stock and max stock
      setMinStock(unfilteredProducts.reduce((prev, cur) => prev.stock < cur.stock ? prev : cur).stock);
      setMaxStock(unfilteredProducts.reduce((prev, cur) => prev.stock > cur.stock ? prev : cur).stock);
    }
    
    if (queryParams.get('price')) {
      let price = queryParams.get('price');
      if (price) {
        let priceArr = price.split('-').map((elem) => Number(elem));
        setPriceValue(priceArr);
        dispatch(setPriceRange(priceArr));
      }
    } 
    if (queryParams.get('stock')) {
      let stock = queryParams.get('stock');
      if (stock) {
        let stockArr = stock.split('-').map((elem) => Number(elem));
        setStockValue(stockArr);
        dispatch(setStockRange(stockArr));
      }
    }
    if (queryParams.get('sort')) {
      let sort = queryParams.get('sort');
      if (sort) {
        setSelectValue(sort);
        dispatch(sortProducts(sort));
      }
    }
  }, []);

  // if user didn't open someone's link, use default value for slider, which is [minPrice, maxPrice]
  useEffect(() => {
    // check for 0 and 0 to skip execution on useState(0)
    if (queryParams.get('price') === null && minPrice !== 0 && maxPrice !== 0) {
      setPriceValue([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    // check for 0 and 0 to skip execution on useState(0)
    if (queryParams.get('stock') === null && minStock !== 0 && maxStock !== 0) {
      setStockValue([minStock, maxStock]);
    }
  }, [minStock, maxStock]);

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
    queryParams.delete('stock');
    if (stockRange && stockRange.length) {
      if (stockRange[0] !== 0 && stockRange[1] !== 0) {
        queryParams.append('stock', stockRange.join('-'));
        navigate(`?${queryParams.toString()}`);
      }
    }
  }, [stockRange]);

  useEffect(() => {
    setFilterItems(products);
  }, [selectedBrands, selectedCategories, priceRange, stockRange, products]);

  return (
    <>
      <div className='filters__wrapper'>
        <div className='select-sort__wrapper'>
          <select value={selectValue} onChange={(e) => handleSortSelect(e.target.value)} className='select-sort'>
            <option value="choose sort">Choose sort</option>
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
        <div className='range'>
          <RangeSlider max={maxPrice} min={minPrice} value={priceValue} why={'price'}></RangeSlider>
          <div className='price-range'>
            <p>${minPrice}</p>
            <p>${maxPrice}</p>
          </div>
        </div>
        <div className='range'>
          <RangeSlider max={maxStock} min={minStock} value={stockValue} why={'stock'}></RangeSlider>
          <div className='price-range'>
            <p>{minStock}</p>
            <p>{maxStock}</p>
          </div>
        </div>
        <button onClick={filtersReset}>Reset Filters</button>
        <button onClick={copyURLHandler}>{copyURLText}</button>
      </div>
    </>
  )
}