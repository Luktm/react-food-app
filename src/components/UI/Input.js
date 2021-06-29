import React, { useRef } from 'react';

import classes from './Input.module.css';

// ref from MealItemForm.js
const Input = React.forwardRef((props, ref) => {
    
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id} className={classes.label}>
                {props.label}
            </label>
            <input
                ref={ref}
                // example props has input: {type: "text"}, it extract it to <input type="text"/>
                {...props.input}
            />
        </div>
    );
});

export default Input;