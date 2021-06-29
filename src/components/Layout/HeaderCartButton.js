import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    // must wrap Provider in App.js
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    // reduce() transforms array data to single number
    const numberOfCartItems = items.reduce((curNumber, item) => {
        // it return previous number and accumlate it
        return curNumber + item.amount;
    }, 0); // starting value

    // use object destructuring for useEffect's array

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {

        console.log('CART USE EFFECT CALL');
        
        if (cartCtx.items.length === 0) {
            return;
        }
        // why 300ms see HeaderCartButton.module.css animation also 300ms
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)

        return () => {
            console.log('CART CLEAR EFFECT CALL');
            // clear old timer
            clearTimeout(timer)
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick} >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;