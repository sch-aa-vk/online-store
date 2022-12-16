import React from 'react';
import { useSelector } from 'react-redux';
import { getProductsSelector, IProduct } from './products.slice';
import { useAppDispatch } from '../store.hooks';
import { addToCart } from '../cart/cart.slice';

import './ProductsList.css';

const ProductsList: React.FC = ({}) => {

  const products = useSelector(getProductsSelector);
  const dispatch = useAppDispatch();

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));

  return (
    <div className='products'>
      <h2 className='products__title'>Products</h2>
      <div className='products__item-wrapper'>
        {products.map(product =>
          <div className='products__item' key={product.id}>
            <div className='products__item-discount'>-{product.discountPercentage}%</div>
            <div className='products__item-pic' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
            <div>{product.brand} {product.title}</div>
            <div>${product.price}</div>
            <div>{product.rating.toFixed(1)}</div>
            <div className='products__item-btn-wrapper'>
              <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Add to card</button>
              <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Buy now</button>
            </div>
            
        </div>)}
      </div>
    </div>
  );
}

export default ProductsList;