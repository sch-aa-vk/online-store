import React from 'react';
import { useAppSelector } from '../../functions/store/store.hooks';
import { getCartProducts, getTotalPrice } from './cart.slice';
import Header from '../../components/header/Header';
import ProductCard from '../../components/product-card/ProductCard';

import './cart.css';

const Cart = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);

  return (
    <div className="cart">
      <Header/>
      <h2>Cart</h2>
       <div className="cart-wrapper">
        {cartProducts.map(product => (
          <ProductCard key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images}></ProductCard>
        ))}
       </div>
    </div>
  )
}

export default Cart;