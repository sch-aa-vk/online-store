import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { getCartProducts, getTotalPrice } from 'store/slices/cart.slice';
import { useAppSelector } from 'store/store.hooks';

import { PurchaseForm } from 'components/purchase-form/purchaseForm';

import './CartSummary.css';

export const CartSummary: React.FC = () => {

  const cartProducts = useAppSelector(getCartProducts);

  const totalPrice = useAppSelector(getTotalPrice);
  const itemsInCart = cartProducts.map(item => item.amount).reduce((acc, curr) => acc + curr, 0);
  const [isModalVisible, setModalVisibility] = useState(false);

  const [value, setValue] = useState("");
  const [promocodeTA, setPromocodeTA] = useState(false);
  const [promocodeRS, setPromocodeRS] = useState(false);

  const TA = localStorage['activeTA'] ? JSON.parse(localStorage['activeTA']) : false;
  const [activeTA, setActiveTA] = useState(TA);
  localStorage['activeTA'] = JSON.stringify(activeTA);

  const RS = localStorage['activeRS'] ? JSON.parse(localStorage['activeRS']) : false;
  const [activeRS, setActiveRS] = useState(RS);
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
