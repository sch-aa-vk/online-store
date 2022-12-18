import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getTotalPrice } from 'store/slices/cart.slice';
import { getProductsSelector } from 'store/slices/products.slice';
import { useAppSelector } from 'store/store.hooks';

import './header.css';

export const Header = () => {

  const products = useSelector(getProductsSelector);
  const totalPrice = useAppSelector(getTotalPrice);

  return(
    <header className='header'>
      <Link className='link' to={"/"}>Home</Link>
      <h5>{products.length}</h5>
      <Link className='link' to={"/cart"}>Cart</Link>
      <h5>{totalPrice}</h5>
    </header>
  )
}