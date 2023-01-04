import React from 'react';
import {Link} from 'react-router-dom';
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, deleteFromCart, getCartProducts } from 'store/slices/cart.slice';

import './productCard.css';

import cart from 'assets/add-to-cart.svg';

export const ProductCard = (product: IProduct) => {

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);
  const productInCard = cartProducts.find((item) => item.id === product.id);

  const addToCartHandler = (product: IProduct) => {
    if (productInCard) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }
  
  return (
    <div className='product__item' style={{border: `${productInCard ? '1px solid #db1e02' : '1px solid rgba(0, 0, 0, 0.15)'}`}}>
      <div className='product__item-img'>
        <Link className='product__item-link' to={`/products/${product.id}`}>
          <img src={product.thumbnail} alt={product.title} />
        </Link>
      </div>
      <div className='product__item-description'>
        <h2>{product.title}</h2>
        <p>Category: <span>{product.category}</span></p>
        <p>Brand: <span>{product.brand}</span></p>
        <p>Price: <span>${product.price}</span></p>
        <p>Stock: <span>{product.stock}</span></p>
      </div>
      <button className='product__item-cart' onClick={() => addToCartHandler(product)} style={{background: `${productInCard ? '#9e9492' : '#db1e02'}`}}>
        <img src={cart} alt="cart"/>
      </button>
    </div>
  )
}