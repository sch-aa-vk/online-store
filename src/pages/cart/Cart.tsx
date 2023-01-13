import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/store.hooks'; 
import { getCartProducts } from 'store/slices/cart.slice';

import { CartForCart } from 'components/cardForCart/CartForCart';
import { CartSummary } from 'layouts/CartSummary/CartSummary';

import './cart.css';

export const Cart = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [page, setPage] = useState(localStorage['page'] ? +queryParams.get('page')! || JSON.parse(localStorage['page']) : 1);
  localStorage['page'] = JSON.stringify(page);
  const [contentPerPage, setContentPerPage] = useState(localStorage['contentPerPage'] ? +queryParams.get('limit')! || JSON.parse(localStorage['contentPerPage']) : 3);
  localStorage['contentPerPage'] = JSON.stringify(contentPerPage);

  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = page * contentPerPage - contentPerPage;
  const maxPageNumber = Math.ceil(cartProducts.length / contentPerPage) || 1;

  useEffect(() => {
    if (page > maxPageNumber) {
      setPage(maxPageNumber);
    }
  }, [page, maxPageNumber])

  useEffect(() => {
    queryParams.delete('limit');
    queryParams.append('limit', `${contentPerPage}`);
    navigate(`?${queryParams.toString()}`, {replace: true});
  }, [contentPerPage]);

  useEffect(() => {
    queryParams.delete('page');
    queryParams.append('page', `${page}`);
    navigate(`?${queryParams.toString()}`, {replace: true});
  }, [page]);

  useEffect(() => {
    if (cartProducts.length === 0) {
      innerHTMl();
    }
  }, [cartProducts])

  return (
    <>
      <div className='cart'>
        <div className='cart-wrapper'>
          <div className='cart-pagination'>
            <p>Products in Cart</p>
            <label>Limit: <input type="number" min={1} value={contentPerPage} onChange={(e) => setContentPerPage(+e.target.value)}/></label>
            <div className='cart-pagination-pages'>
              <p>Page:</p>
              <button onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}>&#60;</button>
              <p>{page}</p>
              <button onClick={() => setPage(page + 1 <= maxPageNumber ? page + 1 : maxPageNumber)}>&#62;</button>
            </div>
          </div>
          <div className="products__wrapper">
            {cartProducts.length === 0 ?
              <p>Products not found</p> :
              cartProducts.slice(firstContentIndex, lastContentIndex).map((product) => (
                <div className='cart-item' key={`${product.title}`}>
                  <p key={`${product.id}-${product.title}`}>{cartProducts.indexOf(product) + 1}</p>
                  <CartForCart key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images} />
                </div>
              ))
            }
          </div>
        </div>
        <CartSummary/>
      </div>
    </>
  )
}

// TODO: use arrow function instead
function innerHTMl() {
  const cart = document.querySelector('.cart')!;
  cart.innerHTML = `<p>Products not found</p>`;
}