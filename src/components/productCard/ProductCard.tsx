import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, removeFromCart, getCartProducts } from 'store/slices/cart.slice';

import './productCard.css';

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
    <div className='products__item'>
      <div className='products__item-discount'>-{product.discountPercentage}%</div>
      <Link to={`/products/${product.id}`}>
        <div className='products__item-pic' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
      </Link>
      <div>{product.brand} {product.title}</div>
      <div>${product.price}</div>
      <div>{product.rating.toFixed(1)}</div>
      <div className='products__item-btn-wrapper'>
        <button disabled={cartProducts.find((item) => item.amount >= product.stock) ? true : false} className='products__item-btn' onClick={() => addToCartHandler(product)}>Add to card</button>
        <button disabled={cartProducts.find((item) => item.id === product.id) ? false : true} onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</button>
        <button className='products__item-btn' onClick={() => buyNowHandler(product)}>Buy now</button>
      </div>
    </div>
  )
}