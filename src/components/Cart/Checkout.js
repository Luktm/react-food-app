import React, { useRef, useState } from 'react'

import classes from './Checkout.module.css';
import { isEmpty, isFiveChars } from '../../utils/validator-util';

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCode,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return null;
        }

        
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        });
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}}`}>
                <label>Your Name</label>
                <input ref={nameInputRef} type="text" id="name" />
                {!formInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}}`}>
                <label>Street</label>
                <input ref={streetInputRef} type="text" id="street" />
                {!formInputValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}}`}>
                <label>Postal Code</label>
                <input ref={postalCodeInputRef} type="text" id="postal" />
                {!formInputValidity.postalCode && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}}`}>
                <label>City</label>
                <input ref={cityInputRef} type="text" id="city" />
                {!formInputValidity.city && <p>Please enter a valid cty!</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onClose}>Cancel</button>
                <button className={classes.submit} type="submit" >Confirm</button>

            </div>
        </form>
    );
}

export default Checkout;