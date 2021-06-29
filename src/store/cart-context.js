import React from 'react';

// consumer 
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { },
});

export default CartContext;