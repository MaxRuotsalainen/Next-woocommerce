import React, { useEffect, useState } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // retrieve the cart from local storage or state
    let cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromStorage);
  }, []);

  const increment = (index) => {
    let updatedCart = [...cart];
    updatedCart[index].quantity++;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrement = (index) => {
    let updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart))
  };


    return (
        <>
        <div className="cartParent">
        <h2>My Cart</h2>
        <table className="table">
            <thead className="cartHead">
            <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((item, index) => (
                
                <tr key={item.product[0].id}>
                    <td><img className="cartImg"src={item.product[0].images[0].src} alt={item.product[0].name} /></td>
                <td>{item.product[0].name}</td>
                <td>
                <div className="number">
                <button onClick={() => decrement(index)}>-</button>
                {item.quantity}
                <button onClick={() => increment(index)}>+</button>
    
                    </div>
                </td>
                <td>{item.product[0].price}</td>
                <td>{item.product[0].price * item.quantity}</td>
                <td> <button onClick={() => handleRemove(index)}>+</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <div>
        <Link href="/checkout">
            <button className="checkout">Checkout</button>
          </Link>
        </div>
        </div>
        </>
    );
    };

export default Cart;
