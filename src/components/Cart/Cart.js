import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';

import Modal from '../UI/Modal'
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';

// useState(weather_state, weather_cubit);
// weather_cubit got emit(weather_state);
const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-3bc9a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        });

        setIsSubmitting(false);
        setDidSubmit(true);

        cartCtx.clearCart();
    };

    const cartItems =
        <ul className={classes['cart-items']}>
            {/* javasript function object must have closure */}
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    // predefined the argument, so we would know what data we are passing to use,
                    // where child component doesn't pass anything to this cb
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>;

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitHandler} onClose={props.onClose} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = (<p>Sending order data...</p>);

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;