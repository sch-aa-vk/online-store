import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AscendingSort } from 'components/sorting/Sort'; 
import { Header } from 'components/header/Header';
import { getProductsSelector } from 'store/slices/products.slice'; 
import { ProductCard } from 'components/productCard/ProductCard'; 

import './home.css';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { brandHandler, categoryHandler, filters, resetFilters, setBrands, setCategories } from 'store/slices/filters.slice';
import { initialState } from 'store/database/products';
import { useLocation, useNavigate } from 'react-router-dom';

export const Home = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {brands: selectedBrands} = useAppSelector(filters);
  const {categories: selectedCategories} = useAppSelector(filters);

  const products = useSelector(getProductsSelector);
  const [value, setValue] = useState("");
  const brandList = Array.from(new Set(initialState.map(item => item.brand)));
  const categoryList = Array.from(new Set(initialState.map(item => item.category)));

  const setCategoriesArray = (categories: string[]) => dispatch(setCategories(categories));
  const setBrandsArray = (categories: string[]) => dispatch(setBrands(categories));

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

  const brandSelect = (brand: {brand: string, checked: boolean}) => dispatch(brandHandler(brand));
  const categorySelect = (category: {category: string, checked: boolean}) => dispatch(categoryHandler(category));
  const filtersReset = () => dispatch(resetFilters());
  const filterItems = products.filter(item => 
    item.brand.toLowerCase().includes(value.toLowerCase()) || item.category.toLowerCase().includes(value.toLowerCase()) ||
    item.title.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase()) ||
    item.price.toString().includes(value) || item.discountPercentage.toString().includes(value) ||
    item.rating.toString().includes(value) || item.stock.toString().includes(value)
  );

  return(
    <div className="app">
      <Header />
      <AscendingSort/>
      <div>
        Reset all filters
        <button onClick={filtersReset}>Reset</button>
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
      <h2 className='products__title'>Products</h2>
      <div className='products__item-wrapper'>
        {filterItems.map(product =>
          <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
        )}
      </div>
    </div>
  );
}