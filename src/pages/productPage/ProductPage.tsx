import React from 'react';
import { Header } from 'components/header/Header'; 
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch } from 'store/store.hooks';
import { addToCart } from 'store/slices/cart.slice';
import { initialState } from 'store/database/products';
import { useParams, Link } from 'react-router-dom';
import { resetFilters } from 'store/slices/filters.slice';

import './productPage.css';
import cart from 'assets/add-to-cart.svg';

export const ProductPage = () => {

  const dispatch = useAppDispatch();

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));

  const { productId } = useParams();
  const product = initialState[+productId! - 1];

  return(
    <>
      <Header/>
      <div className='product_page'>
        <div className='breadcrumps'>
          <Link className='breadcrumps-link' to={"/"} onClick={() => {dispatch(resetFilters())}}>Home</Link>
          <span>/</span>
          <Link className='breadcrumps-link' to={`/?categories=${product.category}`} onClick={() => {dispatch(resetFilters())}}>{product.category}</Link>
          <span>/</span>
          <Link className='breadcrumps-link' to={`/products/${product.id}`}>{product.title}</Link>
        </div>
        <div className='product__item item-description'>
          <div className='img-description'>
            <div className='product__item-img item-img-description'>
              <img src={product.thumbnail} alt="" />
            </div>
          </div>
          <div className='product__item-description item-text'>
            <h2>{product.title}</h2>
            <p>Category: <span>{product.category}</span></p>
            <p>Brand: <span>{product.brand}</span></p>
            <p>Rating: <span>{product.rating}</span></p>
            <p>Price: <span>${product.price}</span></p>
            <p>Discount: <span>{product.discountPercentage}</span></p>
            <p>Stock: <span>{product.stock}</span></p>
            <p>Description: <span>{product.description}</span></p>
          </div>
          <button className='product__item-cart cart-description' onClick={() => addToCartHandler(product)}>
            <p>Add To Cart</p>
            <img src={cart} alt="cart"/>
          </button>
        </div>
      </div>
    </>
  )
}