import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import './purchaseForm.css';
import { deleteFromCart, getCartProducts } from 'store/slices/cart.slice';
import { useAppDispatch, useAppSelector } from 'store/store.hooks';

interface IFormValues {
    fullname: string,
    phone: string,
    deliveryAddress: string,
    email: string,
    cardNumber: string,
    cardExpiryDate: string,
    cvc: string,
}

interface Props {
  onSetModalVisibility: (close: boolean) => void;
};

function identifyCreditCard(card: string) {
    if (card[0] === '4') {
        // return 'Visa';
        return 'https://blog.logomyway.com/wp-content/uploads/2022/02/visa-logo-2.jpg';
    } else if (card[0] === '5') {
        return 'https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=960';
    } else if (card[0] === '3') {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png';
    }
    return '';
}

function keyDownHandler(e: React.KeyboardEvent, maxLen: number) {
    if (e.repeat) {
        e.preventDefault();
        return;
    };
    if (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight'
        && e.code !== 'Digit1' && e.code !== 'Digit2' 
        && e.code !== 'Digit3' && e.code !== 'Digit4' 
        && e.code !== 'Digit5' && e.code !== 'Digit6'
        && e.code !== 'Digit7' && e.code !== 'Digit8'
        && e.code !== 'Digit9' && e.code !== 'Digit0'
        && e.code !== 'Backspace') {
            e.preventDefault();
        }
    if ((e.target as HTMLInputElement).value.length >= maxLen && e.code !== 'Backspace'
        && e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') {
        e.preventDefault();
    }
}

let previousValue = '';
function addSlash(e: React.SyntheticEvent) {
    if ((e.target as HTMLInputElement).value.length === 2 
        && (e.target as HTMLInputElement).value.length > previousValue.length) {
        (e.target as HTMLInputElement).value += '/';
    }
    previousValue = (e.target as HTMLInputElement).value;
}

export function PurchaseForm({onSetModalVisibility}: Props) {
    const [isSuccess, setSuccess] = useState(false);
    const [card, setCard] = useState('');
    const cartProducts = useAppSelector(getCartProducts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
      values, // use this if you want controlled components
      errors,
    } = useFormik({
      initialValues: {
        fullname: "",
        phone: "",
        deliveryAddress: "",
        email: "",
        cardNumber: "",
        cardExpiryDate: "",
        cvc: "",
      },
      validationSchema: Yup.object({
        fullname: Yup.string()
          .matches(/^\b[a-z]{3,}\b \b[a-z]{3,}\b/i, 'Should have at least 2 words each length of 3 minimum')
          .required('*required'),
        phone: Yup.string()
          .matches(/^\+/, 'Doesn\'t start with +')
          .matches(/^\+\d+$/, 'No numbers or contains non-numeric characters')
          .min(11, 'Must be 11 characters or more')
          .required('*required'),
        deliveryAddress: Yup.string()
          .matches(/^\b[a-zA-Z]{5,}\b( \b[a-zA-Z]{5,}\b){2,}/, 'Should have at least 3 words each length of 5 minimum')
          .required('*required'),
        email: Yup.string().email('Invalid email address').required('*required'),
        cardNumber: Yup.string()
          .matches(/\d/, 'Contains non-numeric character')
          .min(16, 'Minimum of 16')
          .max(16, 'Maximum of 16')
          .required('*required'),
        cardExpiryDate: Yup.string()
          .matches(/^(0[1-9]|1[0-2])/, 'Month must fit to template 01-12')
          .min(5)
          .max(5)
          .required('*required'),
        cvc: Yup.string()
          .matches(/\d/, 'Contains non-numeric character')
          .max(3)
          .min(3)
          .required('*required')
      }),
      onSubmit: (values) => {
        console.log(JSON.stringify(values));
        // values = {"favoriteFood":"ramen","favoritePlace":"mountains"}
        setSuccess(true);
        setTimeout(() => {
            cartProducts.map((product) => dispatch(deleteFromCart(product.id)));
            navigate('/');
        }, 3000);
      },
    });

    return (
      <div className='purchase-form__wrapper' onClick={() => onSetModalVisibility(false)}>
        <div className='purchase-form' onClick={(e) => e.stopPropagation()}>
        {isSuccess
           ? <div>Заказ успешно оформлен!</div>
           : <form className='form' onSubmit={handleSubmit}>
                <h2>Personal details</h2>
                <div>
                    <label htmlFor="favoriteFood">Fullname:</label>
                    <input
                        type="text"
                        name="fullname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="name surname"
                    />
                    {touched.fullname && errors.fullname
                    ? <div>{errors.fullname}</div>
                    : null}
                </div>
        
                <div>
                <label htmlFor="favoritePlace">Phone:</label>
                <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+(000)-000-00-00"
                />
        
                {touched.phone && errors.phone
                ? <div>{errors.phone}</div>
                : null}
                </div>

                <div>
                <label htmlFor="favoritePlace">Delivery Address:</label>
                <input
                    type="text"
                    name="deliveryAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="adress"
                />
        
                {touched.deliveryAddress && errors.deliveryAddress
                ? <div>{errors.deliveryAddress}</div>
                : null}
                </div>

                <div>
                <label htmlFor="favoritePlace">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="@xxx.gmail.com"
                />
        
                {touched.email && errors.email
                ? <div>{errors.email}</div>
                : null}
                </div>

                <div>
                <label htmlFor="favoritePlace">Card Number (<img className='card-logo-img' src={`${identifyCreditCard(card)}`}></img>):</label>
                <input
                    type="text"
                    name="cardNumber"
                    onKeyDown={(e) => keyDownHandler(e, 19)}
                    onInput={(e) => {setCard((e.target as HTMLInputElement).value)}}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xxx-xxx-xxxx-xxxx"
                />

                {touched.cardNumber && errors.cardNumber
                ? <div>{errors.cardNumber}</div>
                : null}
                </div>

                <div>
                <label htmlFor="favoritePlace">Card Expiry Date:</label>
                <input
                    type="text"
                    name="cardExpiryDate"
                    onKeyDown={(e) => keyDownHandler(e, 5)}
                    onInput={(e) => addSlash(e)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xx/xx"
                />
        
                {touched.cardExpiryDate && errors.cardExpiryDate
                ? <div>{errors.cardExpiryDate}</div>
                : null}
                </div>

                <div>
                <label htmlFor="favoritePlace">CVC:</label>
                <input
                    type="text"
                    name="cvc"
                    onKeyDown={(e) => keyDownHandler(e, 3)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xxx"
                />
        
                {touched.cvc && errors.cvc
                ? <div>{errors.cvc}</div>
                : null}
                </div>
        
                <button type="submit">Submit</button>
            </form>}
        </div>
      </div>
    );
  }
  
 