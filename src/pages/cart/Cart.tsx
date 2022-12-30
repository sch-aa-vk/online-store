import React, { useState } from 'react';
import { useAppSelector } from 'store/store.hooks'; 
import { getCartProducts } from 'store/slices/cart.slice';
import { Header } from 'components/header/Header'; 
import { CartForCart } from 'components/cardForCart/CartForCart';

import './cart.css';

export const Cart = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const [page, setPage] = useState(1);
  const [contentPerPage, setContentPerPage] = useState(3);
  
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = page * contentPerPage - contentPerPage;
  const maxPageNumber = Math.ceil(cartProducts.length / contentPerPage);

  return (
    <>
      <Header/>
      <div className='cart'>
        <div className='cart-wrapper'>
          <div className='cart-pagination'>
            <p>Products in Cart</p>
            <label>Limit: <input type="text" value={contentPerPage} onChange={(e) => setContentPerPage(+e.target.value)}/></label>
            <div className='cart-pagination-pages'>
              <p>Page:</p>
              <button onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}>&#60;</button>
              <p>{page}</p>
              <button onClick={() => setPage(page + 1 <= maxPageNumber ? page + 1 : maxPageNumber)}>&#62;</button>
            </div>
          </div>
          {cartProducts.slice(firstContentIndex, lastContentIndex).map(product => (
            <CartForCart key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></CartForCart>
          ))}
        </div>
      </div>
    </>
  )
}