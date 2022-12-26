import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { sortProducts } from 'store/slices/products.slice';
import { initialState } from 'store/database/products';
import { getProductsSelector } from 'store/slices/products.slice';
import { brandHandler, categoryHandler, filters, resetFilters, setBrands, setCategories } from 'store/slices/filters.slice';

import './sort.css';

export const Filters: React.FC = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const {brands: selectedBrands} = useAppSelector(filters);
  const {categories: selectedCategories} = useAppSelector(filters);

  const handleSortSelect = (option: string) => dispatch(sortProducts(option));
  const filtersReset = () => dispatch(resetFilters());

  const brandList = Array.from(new Set(initialState.map(item => item.brand)));
  const categoryList = Array.from(new Set(initialState.map(item => item.category)));

  const products = useSelector(getProductsSelector);

  const setCategoriesArray = (categories: string[]) => dispatch(setCategories(categories));
  const setBrandsArray = (categories: string[]) => dispatch(setBrands(categories));

  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));

  useEffect(() => {
    if (queryParams.getAll('categories').length) {
      setCategoriesArray(queryParams.getAll('categories'));
    }
    if (queryParams.getAll('brands').length) {
      setBrandsArray(queryParams.getAll('brands'));
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

  return (
    <>
      <div className='filters__wrapper'>
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