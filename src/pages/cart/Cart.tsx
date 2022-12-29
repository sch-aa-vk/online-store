import React from 'react';
import { useAppSelector } from 'store/store.hooks'; 
import { getCartProducts } from 'store/slices/cart.slice';
import { Header } from 'components/header/Header'; 
import { CartForCart } from 'components/cardForCart/CartForCart';

import './cart.css';

export const Cart = () => {

  const cartProducts = useAppSelector(getCartProducts);

  return (
    <>
      <Header/>
      <div className='cart'>
        <div className='cart-wrapper'>
          {cartProducts.map(product => (
            <CartForCart key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></CartForCart>
          ))}
        </div>
      </div>
    </>
  )
}