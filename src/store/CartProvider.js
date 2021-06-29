import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {

        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;

        // check existing item, if not have it return -1
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.payload.id
        );

        // if has item then do something
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems = [];

        if (existingCartItem) {
            // pass exisiting selected object, but add more amount into it
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            };

            // copy a brand new state without overrite the state,
            // * remember don't mutate reducer default state, must not overwrite it, only do a copy
            updatedItems = [...state.items]; // copy new default state.
            updatedItems[existingCartItemIndex] = updatedItem; // choose the selected index item at line 12 and replace the new one
        } else {
            // concat return brand new array, with immutatable way
            /**
             *  var hege = [];
             *  var stale = {"cecilie": "Cecilie", "lone":"Lone"};
             *  hege.concat(stale);
             *  console.log is [{cecilie: "Cecilie", lone: "Lone"}];
             */
            updatedItems = state.items.concat(action.payload);
        }

        // return to state and it will rerender re-evaluate dom
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    } else if (action.type === "REMOVE") {


        // check existing item, if not have it return -1
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        // get object from array
        const existingCartItem = state.items[existingCartItemIndex];
        // decrease the total amount by minus the selected id of price 
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        // remember it's a array
        let updatedItems = [];

        if (existingCartItem.amount === 1) {
            // filter return new array
            updatedItems = state.items.filter((item) => {
                return item.id !== action.id;
            });
        } else {
            // pass the selected object an tweak it
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            // copy a new default state
            updatedItems = [...state.items];
            // select specify object from array, replace it, then it return brand new array
            updatedItems[existingCartItemIndex] = updatedItem
        }

        // return to cartState at line 90, const[cartState, dispatchCartAction]
        // * return to state and it will rerender or re-evaluate dom
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }

    } else if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;


};


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "ADD", payload: item })

    };
    const removeItemToCartHandler = (id) => {
        // remove selected item
        dispatchCartAction({ type: "REMOVE", id: id })
    };
    
    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }
    
    // see the dynamic val or function here 
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;