import React, { Fragment, useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

import CartProvider from './store/CartProvider';

/**
 * this is good practice
 * <body>
 *  <header></header
 *  <main>
 *    section is like seperate things
 *    <section></section>
 *    <section></section>
 *  </main>
 *  <footer></footer
 * </body
 */

function App() {
  // remember second array is not a function, it's set state, 
  // better put most of the function in App.js
  // for callback in nest widget better put it in function and pass props into it
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  // page take all view better create a new folder, overlay also count as new page
  return (
    // get fro store/CartProvider, pass provider inside
    <CartProvider>
      <Fragment>
        {/* modal overlay cart*/}
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </Fragment>
    </CartProvider>
  );
}

export default App;
