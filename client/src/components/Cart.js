import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const getCart = async (abort) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {signal: abort.signal});
      const data = await response.json();
      setCart(data);
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
  currentValue = currentValue.Price;
  accumulator += currentValue;
  return accumulator
}, 0)
}

const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const entries = [...formData.entries()];

  const client = entries.reduce((acc, entry) => {
    const [k, v] = entry;
    acc[k] = v;
    return acc;
  }, {});

  const order = {
    client: {
      name: client.name,
      phone: client.number,
      email: client.email,
      address: client.address
    },
    products: cart.map(item => ( 
      {
        Title: item.Title,
        Quantity: item.Quantity,
        Price: item.Price
      }
    ))
  }

  navigate("/");

  return fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...order}),
    }).then((res) => res.json());
}

  return (
    <>
    {cart?.length ? (<div className='checkout-page'>
      <form name="order" onSubmit={onSubmit}> 
        <div className='products'>
            {cart && cart.map(cartItem => (
              <div className='product' key={cartItem._id}>
                <p><strong>{cartItem.Title}</strong> x{cartItem.Quantity}</p>
                <p><strong>${cartItem.Price}</strong></p>
              </div>
            ))}
          <div className='line'></div>
          <div className='total'>
            <p><strong>Total:</strong> {cart ? `$${total(cart)}` : null}</p>
          </div>
        </div>
        <div className='client'>
          <div>
            <label htmlFor="name">Name: </label>
            <input name="name" type="text" placeholder="Sherlock Holmes"></input>
          </div>
          <div>
            <label htmlFor="number">Number: </label>
            <input name="number" type="tel" placeholder="+447258364"></input>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input name="email" type="email" placeholder="sherlocked@gmail.com"></input>
          </div>
          <div>
            <label htmlFor="address">Address: </label>
            <input name="address" type="text" placeholder="221B Baker Street"></input>
          </div>
        </div>
        <div className='submit-btn'>
          <button type="submit" className='checkout'>Checkout</button>
        </div>
      </form>
    </div>) : (
      <div className="no-products">
        <p>You have yet to select any movies.</p>
      </div>
    )}
    </>
  )
}
