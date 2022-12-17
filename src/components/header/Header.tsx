import React from 'react';
import {Link} from 'react-router-dom';
import { getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';

import './header.css';

export const Header = () => {

  const totalPrice = useAppSelector(getTotalPrice);

  return(
    <header className='header'>
      <Link className='link' to={"/"}>Home</Link>
      <Link className='link' to={"/cart"}>Cart</Link>
      <h5>{totalPrice}</h5>
    </header>
  )
}