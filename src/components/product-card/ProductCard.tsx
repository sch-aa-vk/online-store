import React from 'react';
import { IProduct } from '../products/products.slice';
import { useAppDispatch } from '../../functions/store/store.hooks';
import { addToCart, removeFromCart } from '../../pages/cart/cart.slice';


const ProductCard = (product: IProduct) => {

  const dispatch = useAppDispatch();

  const addToCartHandler = (product: IProduct) => dispatch(addToCart(product));
  const handleRemoveFromCart = (productId: number) => dispatch(removeFromCart(productId));

  return (
    <div className='products__item' key={product.id}>
      <div className='products__item-discount'>-{product.discountPercentage}%</div>
      <div className='products__item-pic' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
      <div>{product.brand} {product.title}</div>
      <div>${product.price}</div>
      <div>{product.rating.toFixed(1)}</div>
      <div className='products__item-btn-wrapper'>
        <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Add to card</button>
        <button className='products__item-btn' onClick={() => addToCartHandler(product)}>Buy now</button>
        <button onClick={() => handleRemoveFromCart(product.id)}>Remove from cart</button>
      </div>
    </div>
  )
}

export default ProductCard;