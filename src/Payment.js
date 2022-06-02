import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { db } from "./firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [successed, setSuccessed] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    //  generate the special stripe secret which allows us to charge a customer
    const getSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      // const responseData = await response.json();
      // console.log(response);
      setClientSecret(response.data.clientSecret);
    };
    getSecret();
  }, [basket]);

  console.log("secreate is", clientSecret);

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        console.log(paymentIntent);

        db.colleection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSuccessed(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history("/orders");
      })
      .catch((error) => {
        setError(error.message);
        setProcessing(false);
      });
  console.log(payload)
    };

  const handleChange = (event) => {
    console.log(event);
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h1> Delivery Address </h1>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los angles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h1> Review your order </h1>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.item.id}
                title={item.item.title}
                image={item.item.image}
                price={item.item.price}
                rating={item.item.rating}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="payment__section">
        <div className="payment__title">
          <h1> Payment Method </h1>
        </div>
        <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total:{value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>

            <button disabled={processing || disabled || successed}>
              <span>{processing ? "Processing" : "Buy Now"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
