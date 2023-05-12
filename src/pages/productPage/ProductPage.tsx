import { IProduct } from 'store/interface/IProduct'; 
import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { addToCart, deleteFromCart, getCartProducts } from 'store/slices/cart.slice';
import { initialState } from 'store/database/products';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetFilters } from 'store/slices/filters.slice';

import './productPage.css';
import { AddToCartIcon } from 'assets/add-to-cart';
import { useRef } from 'react';

export const ProductPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const image = useRef<HTMLDivElement>(null);

  const cartProducts = useAppSelector(getCartProducts);
  const product = initialState[+productId! - 1];
  const productInCard = cartProducts.find((item) => item.id === product.id);
  const imagesBlocks = product.images.map((item) => 
    <div className='product__item-img item-img-description small-img' key={item} onClick={() => changeImg(item)}>
      <img src={item} alt='' />
    </div>
  )

  const addToCartHandler = (product: IProduct) => {
    if (productInCard) {
      dispatch(deleteFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  }

  const buyNowHandler = (product: IProduct) => {
    if (!productInCard) {
      dispatch(addToCart(product));
    }
    navigate('/cart?form=true');
  }

  const changeImg = (item: string) => {
    // const block = document.querySelector('.big-img') as Element;
    image.current!.innerHTML = `<img src=${item} alt='' />`;
    console.log(image.current);
  };

  return(
    <>
      <div className='product_page'>
        <div className='breadcrumps'>
          <Link className='breadcrumps-link' to={"/"} onClick={() => {dispatch(resetFilters())}}>Home</Link>
          <span>/</span>
          <Link className='breadcrumps-link' to={`/?categories=${product.category}`} onClick={() => {dispatch(resetFilters())}}>{product.category}</Link>
          <span>/</span>
          <Link className='breadcrumps-link' to={`/?brands=${product.brand}`} onClick={() => {dispatch(resetFilters())}}>{product.brand}</Link>
          <span>/</span>
          <Link className='breadcrumps-link' to={`/products/${product.id}`}>{product.title}</Link>
        </div>
        <div className='product__item item-description'>
          <div className='img-description'>
            <div className='product__item-img item-img-description big-img' ref={image}>
              <img src={product.thumbnail} alt="" />
            </div>
            <div className='small-img-collection'>
              {imagesBlocks}
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
          <div className='buttons-container'>
            <button className='product__item-cart cart-description' onClick={() => buyNowHandler(product)} style={{background: '#db1e02'}}>
              <p>Buy now</p>
            </button>
            <button className='product__item-cart cart-description' onClick={() => addToCartHandler(product)} style={{background: `${productInCard ? '#9e9492' : '#db1e02'}`}}>
              <p>{productInCard ? 'Remove From Cart' : 'Add To Cart'}</p>
              <AddToCartIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
