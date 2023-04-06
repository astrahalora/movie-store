import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import cinemagic from './img/cinemagic.png'
import cart from './img/cart.png';

export default function RootLayout() {

  const [items, setItems] = useState(null);
  const [itemAdded, setItemAdded] = useState([]);

  const getCart = async (abort) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {signal: abort.signal});
      const data = await response.json();
      setItems(data);

    } catch (error) {
      if(error.name === "AbortError") {
        console.log('Fetch aborted');
      } else {
      console.log(error.message);
      }
    };
  };

useEffect(() => {
  const abortCont = new AbortController();
  getCart(abortCont);
  return () => abortCont.abort();
}, []);

const total = (data) => {
  return data.reduce((accumulator, currentValue) => {
  currentValue = currentValue.Quantity;
  accumulator += currentValue;
  return accumulator
}, 0)
}

  return (
    <>
    {items && <div className="root-layout">
        <header>
            <nav>
                <img src={cinemagic} alt="Logo"/>
                <div>
                  <NavLink to="/" id="home">Movies</NavLink>
                  <NavLink to="/favorites">Favorite Movies</NavLink>
                  <NavLink to="/checkout">
                    <img src={cart} id="cart-img"alt="Cart"/><p id="amount">{total(items)}</p>
                    </NavLink>
                </div>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>}
    </>
  )
}
