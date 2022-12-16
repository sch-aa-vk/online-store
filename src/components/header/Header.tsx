import React from 'react';
import {Link} from 'react-router-dom';
import { getTotalPrice } from '../../pages/cart/cart.slice';
import { useAppSelector } from '../../functions/store/store.hooks';

import './header.css';

const Header = () => {

  const totalPrice = useAppSelector(getTotalPrice);

  return(
    <header className='header'>
      <Link className='link' to={"/"}>Home</Link>
      <Link className='link' to={"/cart"}>Cart</Link>
      <h5>{totalPrice}</h5>
    </header>
  )
}

export default Header;