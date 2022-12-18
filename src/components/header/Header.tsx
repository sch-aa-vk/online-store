import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { getProductsSelector } from 'store/slices/products.slice';
import { useAppSelector } from 'store/store.hooks';

import './header.css';

export const Header = () => {

  const products = useSelector(getProductsSelector);
  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);

  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);

  return(
    <header className='header'>
      <Link className='link' to={"/"}>Home</Link>
      <h5>found: {products.length}</h5>
      <Link className='link' to={"/cart"}>Cart</Link>
      <h5>{totalPrice}</h5>
      <h5>items in cart: {itemsInCart}</h5>
    </header>
  )
}