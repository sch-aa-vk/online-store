import React from 'react';
import {Link} from 'react-router-dom';
import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, deleteFromCart, getCartProducts } from 'store/slices/cart.slice';

import './productCard.css';

import cart from 'assets/add-to-cart.svg';
import { initialState } from 'store/database/products';

// TODO: move to interface folder and change name

type cartInterface = {
  id: number,
  thumbnail: string,
  title: string,
  category: string,
  brand: string,
  price: number,
  discountPercentage: number,
  description: string, 
  rating: number, 
  stock: number, 
  images: Array<string>,
  amount: number,
  mode: 'row' | 'column'
}

export const ProductCard: React.FC<cartInterface> = ({id, thumbnail, title, category, brand, price, stock, discountPercentage, mode}) => {

  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);
  const productInCard = cartProducts.find((item) => item.id === id) as IProduct;
  const product = initialState.find((item) => item.id === id) as IProduct;

  const addToCartHandler = (product: IProduct) => {
    if (productInCard) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }
  
  return (
    <div className={`product__item ${mode}`} style={{border: `${productInCard ? '1px solid #db1e02' : '1px solid rgba(0, 0, 0, 0.15)'}`}}>
      <div className='product__item-img'>
        <Link className='product__item-link' to={`/products/${id}`}>
          <img src={thumbnail} alt={title} />
        </Link>
      </div>
      <div className={`product__item-description ${mode}`}>
        <h2>{title}</h2>
        <p>Category: <span>{category}</span></p>
        <p>Brand: <span>{brand}</span></p>
        <p>Price: <span>${price}</span></p>
        <p>Discount: <span>{discountPercentage}</span></p>
        <p>Stock: <span>{stock}</span></p>
      </div>
      <button className={`product__item-cart ${mode}`} onClick={() => addToCartHandler(product)} style={{background: `${productInCard ? '#9e9492' : '#db1e02'}`}}>
        <img src={cart} alt="cart"/>{mode === 'column' ? <p>${price}</p> : <></>}
      </button>
    </div>
  )
}