import React from 'react';
import { Header } from 'components/header/Header'; 
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, getCartProducts, removeFromCart } from 'store/slices/cart.slice';
import { initialState } from 'store/database/products';
import { useParams, Link } from 'react-router-dom';

import './productPage.css';
import { resetFilters } from 'store/slices/filters.slice';

export const ProductPage = () => {

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));
  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));

  const { productId } = useParams();
  const product = initialState[+productId! - 1];

  return(
    <div className='product_page'>
      <Header/>
      <div className='breadcrumps'>
        <Link className='breadcrumps-link' to={"/"} onClick={() => {dispatch(resetFilters())}}>Home</Link>
        <span>/</span>
        <Link className='breadcrumps-link' to={`/?categories=${product.category}`} onClick={() => {dispatch(resetFilters())}}>{product.category}</Link>
        <span>/</span>
        <Link className='breadcrumps-link' to={`/products/${product.id}`}>{product.title}</Link>
      </div>
      <div className='products__item'>
        <div className='products__item-discount'>-{product.discountPercentage}%</div>
        <div className='products__item-pic' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
        <div>{product.brand} {product.title}</div>
        <div>${product.price}</div>
        <div>{product.rating.toFixed(1)}</div>
        <div className='products__item-btn-wrapper'>
          <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Add to card</button>
          <button disabled={cartProducts.find((item) => item.id === product.id) ? false : true} onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</button>
          <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Buy now</button>
        </div>
      </div>
    </div>
  )
}