import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

const Checkout = () => {

const[{basket,user},dispatch]=useStateValue();
// console.log(user.email)

  return (
    <div className="checkout">
    <div className="checkout_left">
    <img
    className="checkout__ad"
    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
    alt=""
    />
    <div>
    <h3>HELLO, {user?.email ? user.email : " " }</h3>

    <h2 className="checkout__title">Your shopping Basket</h2>
     
    {basket.map(item => (
<CheckoutProduct
id={item.item.id}
title={item.item.title}
image={item.item.image}
price = {item.item.price}
 rating={item.item.rating}
/>

    ))}

    </div>
    </div>
    <div className="checkout_right">
    <Subtotal/>


    <h2>The subtotal will go here </h2>
    </div>
    </div>
  )
}

export default Checkout