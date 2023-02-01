import React, { useEffect, useState } from 'react';

import Link from 'next/link';

const Checkout = () => {
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
       
<div class="row">
  <div class="col-75">
    <div class="container">
      <form action="/action_page.php">
      
        <div class="row">
          <div class="col-50">
            <h3>Billing Address</h3>
         
            <label for="email"><i class="fa fa-envelope"></i> Email</label>
            <input className="FLName" type="text" id="email" name="email" placeholder="john@example.com"/>
        

            <div class="row">
            <div class="col-50">
                <label for="firstName">First name*</label>
                <input className="FLName" type="text" id="firstName" name="firstName" placeholder="First name"/>
              </div>
              <div class="col-50">
                <label for="state">Last name*</label>
                <input className="FLName" type="text" id="lName" name="state" placeholder="Last Name"/>
              </div>
              
            </div>
          </div>

       
          
        </div>
       
      
      </form>
    </div>

    <div className="cartParent">
        <h2>My Cart</h2>
       
       
           
        <div className="checkoutHead">
          <div className="checkoutHeadProduct">Product</div>
          <div className="checkoutHeadPrice">Price</div>
        </div>
            {cart.map((item, index) => (
                
                <div key={item.product[0].id}>
                    
              <div className='productName'>
                <p>{item.product[0].name}</p>
                </div>
                <div className='productPrice'>
                <p>{item.product[0].price * item.quantity}</p>
                </div>
             
               
                </div>
            ))}
           
       
   
        </div>
  </div>
  </div>

 
      

        </>
    );
    };

export default Checkout;
