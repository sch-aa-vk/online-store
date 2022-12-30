import React from 'react';
import {Link} from 'react-router-dom';
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch } from 'store/store.hooks';
import { addToCart, removeFromCart } from 'store/slices/cart.slice';

import './cartForCart.css';

export const CartForCart = (product: IProduct) => {

  const dispatch = useAppDispatch();

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));
  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));
  
  return (
    <div className='product__item item-for-cart'>
      <div className='product__item-img'>
        <Link className='product__item-link' to={`/products/${product.id}`}>
          <img src={product.thumbnail} alt={product.title} />
        </Link>
      </div>
      <div className='product__item-description'>
        <h2>{product.title}</h2>
        <p>Brand: <span>{product.brand}</span></p>
        <p>Stock: <span>{product.stock}</span></p>
        <p>Description: <span>{product.description}</span></p>
      </div>
      <div className='product__item-add'>
        <p>Price: ${product.amount * product.price}</p>
        <div className='product__item-button'>
          <button onClick={() => handleRemoveFromCart(product.id)}>
            <span className='minus'>-</span>
          </button>
          <p>{product.amount}</p>
          <button onClick={() => addToCartHandler(product)}>
            <span className='plus'>+</span>
          </button>
        </div>
      </div>
    </div>
  )
}