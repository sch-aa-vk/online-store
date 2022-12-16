import React from 'react';
import {Link} from 'react-router-dom';
import { IProduct } from '../products/products.slice';
import { useAppDispatch, useAppSelector } from '../../functions/store/store.hooks';
import { addToCart, removeFromCart, getCartProducts } from '../../pages/cart/cart.slice';

import './product-card.css';

const ProductCard = (product: IProduct) => {

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));
  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));
  
  return (
    <div className='products__item'>
      <div className='products__item-discount'>-{product.discountPercentage}%</div>
      <Link to={`/product-${product.id}`}>
        <div className='products__item-pic' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
      </Link>
      <div>{product.brand} {product.title}</div>
      <div>${product.price}</div>
      <div>{product.rating.toFixed(1)}</div>
      <div className='products__item-btn-wrapper'>
        <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Add to card</button>
        <button disabled={cartProducts.find((item) => item.id === product.id) ? false : true} onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</button>
        <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Buy now</button>
      </div>
    </div>
  )
}

export default ProductCard;