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
    <div>
      <h2>Product list</h2>
      {products.map(product =>
        <div key={product.id}>
          <span>{`${product.title}: ${product.price}`}</span>
          <button onClick={() => addToCartHandler(product)}>Add to card</button>
        </div>)}
    </div>
  );
}

export default ProductsList;