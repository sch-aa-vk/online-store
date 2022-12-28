import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, removeFromCart, getCartProducts } from 'store/slices/cart.slice';

import './productCard.css';

import cart from 'assets/add-to-cart.svg';

export const ProductCard = (product: IProduct) => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));
  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));
  const buyNowHandler = (product: IProduct) => {
    let productInCard = cartProducts.find((item) => item.id === product.id);

    if (productInCard) {
      if (productInCard.amount >= product.stock) {
        navigate('/cart');
      } else {
        navigate('/cart');
        return addToCartHandler(product);
      }
    } else {
      navigate('/cart');
      return addToCartHandler(product);
    }
  }
  
  return (
    <div className='product__item'>
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
      <button className='product__item-cart' onClick={() => addToCartHandler(product)}>
        <img src={cart} alt="cart"/>
      </button>
    </div>
  )
}