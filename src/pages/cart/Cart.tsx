import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store.hooks'; 
import { getCartProducts } from 'store/slices/cart.slice';
import { Header } from 'components/header/Header'; 
import { PurchaseForm } from 'components/purchase-form/purchaseForm';
import { CartForCart } from 'components/cardForCart/CartForCart';

import './cart.css';
import { useLocation, useNavigate } from 'react-router-dom';

export const Cart = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [isModalVisible, setModalVisibility] = useState(false);
  const [page, setPage] = useState(localStorage['page'] ? JSON.parse(localStorage['page']) : 1);
  localStorage['page'] = JSON.stringify(page);
  const [contentPerPage, setContentPerPage] = useState(localStorage['contentPerPage'] ? JSON.parse(localStorage['contentPerPage']) : 3);
  localStorage['contentPerPage'] = JSON.stringify(contentPerPage);

  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = page * contentPerPage - contentPerPage;
  const maxPageNumber = Math.ceil(cartProducts.length / contentPerPage);

  useEffect(() => {
    if (contentPerPage) {
      queryParams.delete('limit');
      queryParams.append('limit', `${contentPerPage}`);
      navigate(`?${queryParams.toString()}`);
    }
  }, [contentPerPage]);

  useEffect(() => {
    if (page) {
      queryParams.delete('page');
      queryParams.append('page', `${page}`);
      navigate(`?${queryParams.toString()}`);
    }
  }, [page]);

  useEffect(() => {
    if (cartProducts) {
      if (Number(queryParams.get('page')) > maxPageNumber && maxPageNumber >= 1) {
        setPage(maxPageNumber);
      }
    }
  }, [cartProducts]);

  return (
    <>
      <Header/>
      <div className='cart'>
        <div className='cart-wrapper'>
          <div className='cart-pagination'>
            <p>Products in Cart</p>
            <label>Limit: <input type="number" value={contentPerPage} onChange={(e) => setContentPerPage(+e.target.value)}/></label>
            <div className='cart-pagination-pages'>
              <p>Page:</p>
              <button onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}>&#60;</button>
              <p>{page}</p>
              <button onClick={() => setPage(page + 1 <= maxPageNumber ? page + 1 : maxPageNumber)}>&#62;</button>
            </div>
          </div>
          <div>
            <button onClick={() => setModalVisibility(true)}>Buy Now</button>
          </div>
          {cartProducts.length === 0 ?
            <>Товары в корзине не найдены</> :
            cartProducts.slice(firstContentIndex, lastContentIndex).map((product) => (
              <div className='cart-item' key={`${product.title}`}>
                <p key={`${product.id}-${product.title}`}>{cartProducts.indexOf(product) + 1}</p>
                <CartForCart key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images} />
              </div>
            ))
          }
        </div>
      </div>

      {isModalVisible && <PurchaseForm></PurchaseForm>}
    </>
  )
}