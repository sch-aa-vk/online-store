import React from 'react';
import {Link} from 'react-router-dom';
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';

import './header.css';

export const Header = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);

  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);

  return(
    <header className='header'>
      <Link className='link' to={"/"}>Home</Link>
      <Link className='link' to={"/cart"}>Cart</Link>
      <h5>{totalPrice}</h5>
      <h5>items in cart: {itemsInCart}</h5>
    </header>
  )
}