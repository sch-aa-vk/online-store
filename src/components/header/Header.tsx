import React from 'react';
import {Link} from 'react-router-dom';
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';

import './header.css';
import logo from 'assets/logo.svg';
import cart from 'assets/cart.svg';

export const Header = () => {

  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);

  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);

  return(
    <header className='header'>
      <Link className='store-link' to={"/"}>
        <img className='store-logo' src={logo} alt="online store logo" />
        <p className='store-text'>online store</p>
      </Link>
      <Link className='cart-link' to={"/cart"}>
        <button className='cart-button'>
          <img className='cart-logo' src={cart} alt="cart logo" />
          <p className='cart-text'>{itemsInCart}, ${totalPrice}</p>
        </button>
      </Link>
    </header>
  )
}