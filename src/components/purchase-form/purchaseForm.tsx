import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import './purchaseForm.css';
import { boolean } from 'yup/lib/locale';

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
    if (card[0] === '4' && card.length === 19) {
        return 'Visa';
    } else if (card[0] === '5' && card.length === 16) {
        return 'Mastercard';
    } else if (card[0] === '3' && card.length === 15) {
        return 'American Express';
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

function keyUpHandler(e: React.KeyboardEvent) {
    if (e.code !== 'Backspace' && (e.target as HTMLInputElement).value.length === 2) {
        (e.target as HTMLInputElement).value += '/';
    }
}

export function PurchaseForm({onSetModalVisibility}: Props) {
    const [isSuccess, setSuccess] = useState(false);
    const [card, setCard] = useState('');
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
          .required('Required'),
        phone: Yup.string()
          .matches(/^\+/, 'Doesn\'t start with +')
          .matches(/^\+\d+$/, 'No numbers or contains non-numeric characters')
          .min(11, 'Must be 11 characters or more')
          .required('Required'),
        deliveryAddress: Yup.string()
          .matches(/^\b[a-zA-Z]{5,}\b( \b[a-zA-Z]{5,}\b){2,}/, 'Should have at least 3 words each length of 5 minimum')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        cardNumber: Yup.string()
          .matches(/\d/, 'Contains non-numeric character')
          .min(15, 'Minimum of 15')
          .max(19, 'Maximum of 19')
          .required('Required'),
        cardExpiryDate: Yup.string()
          .matches(/^(0[1-9]|1[0-2])/, 'Month must fit to template 01-12')
          .min(5)
          .max(5),
        cvc: Yup.string()
          .matches(/\d/, 'Contains non-numeric character')
          .max(3)
          .min(3)
          .required('Required')
      }),
      onSubmit: (values) => {
        console.log(JSON.stringify(values));
        // values = {"favoriteFood":"ramen","favoritePlace":"mountains"}
        setSuccess(true);
        setTimeout(() => {
            // TODO: clear the cart here
            navigate('/');
        }, 3000);
      },
    });
  
    return (
      <div className='purchase-form__wrapper'>
        <div className='purchase-form'>
            <button onClick={() => onSetModalVisibility(false)}>Close</button>
        {isSuccess
           ? <div>Заказ успешно оформлен!</div>
           : <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="favoriteFood">Fullname:</label>
                    <input
                        type="text"
                        name="fullname"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                />
        
                {touched.email && errors.email
                ? <div>{errors.email}</div>
                : null}
                </div>

                <div>
                <label htmlFor="favoritePlace">Card Number ({identifyCreditCard(card)}):</label>
                <input
                    type="text"
                    name="cardNumber"
                    onKeyDown={(e) => keyDownHandler(e, 19)}
                    onInput={(e) => {setCard((e.target as HTMLInputElement).value)}}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    onKeyUp={(e) => keyUpHandler(e)}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                />
        
                {touched.cvc && errors.cvc
                ? <div>{errors.cvc}</div>
                : null}
                </div>
        
                <button type="submit">submit</button>
            </form>}
        </div>
      </div>
    );
  }
  
 