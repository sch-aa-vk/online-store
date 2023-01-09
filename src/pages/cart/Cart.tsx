import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store.hooks'; 
import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { Header } from 'components/header/Header'; 
import { PurchaseForm } from 'components/purchase-form/purchaseForm';
import { CartForCart } from 'components/cardForCart/CartForCart';

import './cart.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export const Cart = () => {

  const cartProducts = useAppSelector(getCartProducts);

  const [page, setPage] = useState(localStorage['page'] ? JSON.parse(localStorage['page']) : 1);
  localStorage['page'] = JSON.stringify(page);
  const [contentPerPage, setContentPerPage] = useState(localStorage['contentPerPage'] ? JSON.parse(localStorage['contentPerPage']) : 3);
  localStorage['contentPerPage'] = JSON.stringify(contentPerPage);

  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = page * contentPerPage - contentPerPage;
  const maxPageNumber = Math.ceil(cartProducts.length / contentPerPage);

  useEffect(() => {
    if (page > maxPageNumber) {
      setPage(maxPageNumber);
    }
  }, [page, maxPageNumber])

  return (
    <>
      <Header/>
      <div className='cart'>
        <div className='cart-wrapper'>
          <div className='cart-pagination'>
            <p>Products in Cart</p>
            <label>Limit: <input type="number" min={1} value={contentPerPage} onChange={(e) => setContentPerPage(+e.target.value)}/></label>
            <div className='cart-pagination-pages'>
              <p>Page:</p>
              <button onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}>&#60;</button>
              <p>{page}</p>
              <button onClick={() => setPage(page + 1 <= maxPageNumber ? page + 1 : maxPageNumber)}>&#62;</button>
            </div>
          </div>
          {cartProducts.length === 0 ?
            <>Товары в корзине не найдены</> :
            cartProducts.slice(firstContentIndex, lastContentIndex).map((product) => (
              <div className='cart-item' key={`${product.title}`}>
                <p key={`${product.id}-${product.title}`}>{cartProducts.indexOf(product) + 1}</p>
                <CartForCart key={product.id} amount={product.amount} id={product.id} title={product.title} description={product.description} price={product.price} discountPercentage={product.discountPercentage} rating={product.rating} stock={product.stock} brand={product.brand} category={product.category} thumbnail={product.thumbnail} images={product.images} />
              </div>
            ))
          }
        </div>
        {CardSummary()};
      </div>
    </>
  )
}

// TODO: use arrow function instead
function CardSummary() {

  const cartProducts = useAppSelector(getCartProducts);

  const totalPrice = useAppSelector(getTotalPrice);
  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);
  const [isModalVisible, setModalVisibility] = useState(false);

  const [value, setValue] = useState("");
  const [promocodeTA, setPromocodeTA] = useState(false);
  const [promocodeRS, setPromocodeRS] = useState(false);

  const [activeTA, setActiveTA] = useState(localStorage['activeTA'] ? JSON.parse(localStorage['activeTA']) : false);
  localStorage['activeTA'] = JSON.stringify(activeTA);

  const [activeRS, setActiveRS] = useState(localStorage['activeRS'] ? JSON.parse(localStorage['activeRS']) : false);
  localStorage['activeRS'] = JSON.stringify(activeRS);

  const [discount, setDiscount] = useState(localStorage['discount'] ? +localStorage['discount'] : 1);
  localStorage['discount'] = JSON.stringify(discount);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const boolean = JSON.parse(searchParams.get('form') as string);
  const [form, setForm] = useState(boolean);

  useEffect(() => {
    if (form) {
      setModalVisibility(true);
      setForm(false);
    }
  })

  useEffect(() => {
    queryParams.delete('form');
    if (isModalVisible) {
      queryParams.append('form', `${isModalVisible}`);
    }
    navigate(`?${queryParams.toString()}`, {replace: isModalVisible});
  }, [isModalVisible]);

  useEffect(() => {
    switch (value) {
      case('TA'):
        setPromocodeTA(true);
        break;
      case('RS'): 
        setPromocodeRS(true);
        break;
      default:
        setPromocodeTA(false);
        setPromocodeRS(false);
        break;
    }
  })  

  return (
    <>
      <div className='cart-summary'>
        <h2>Summary</h2>
        <p>Products: <span>{itemsInCart}</span></p>
        <div className='promocode-container'>
          <p style={{textDecoration: `${activeRS || activeTA ? 'line-through' : ''}`}}>Total: <span>${totalPrice}</span></p>
          {activeRS || activeTA ? <p>Total: <span>${Math.ceil(totalPrice * discount)}</span></p> : <></>}
        </div>
        {activeRS || activeTA ?
        <div className='promocode-active'>
          <h2>Active Promocodes</h2>
          {activeTA ? <div className='promocode-block'><p>10% discount 'TA'</p><button onClick={() => {setActiveTA(false); setDiscount(discount + 0.1);}}>remove</button></div> : <></>}
          {activeRS ? <div className='promocode-block'><p>10% discount 'RS'</p><button onClick={() => {setActiveRS(false); setDiscount(discount + 0.1);}}>remove</button></div> : <></>}
        </div>
        : <></>}
        <div className='cart-summary-input'>
          <input type='text' id='promocode' placeholder='Enter promo code' onChange={(e) => setValue(e.target.value)} value={value}/>
          <button onClick={() => setValue('')}>x</button>
        </div>
        {promocodeTA ? (activeTA ? <></> : <div className='promocode-block'><p>10% discount 'TA'</p><button onClick={() => {setActiveTA(true); setDiscount(discount - 0.1);}}>add</button></div>) : <></>}
        {promocodeRS ? (activeRS ? <></> : <div className='promocode-block'><p>10% discount 'RS'</p><button onClick={() => {setActiveRS(true); setDiscount(discount - 0.1);}}>add</button></div>) : <></>}
        <p>** promocodes: "TA", "RS"</p>
        <button onClick={() => setModalVisibility(true)}>Buy Now</button>
      </div>
      {isModalVisible && <PurchaseForm onSetModalVisibility={setModalVisibility}></PurchaseForm>}
    </>
  )
}