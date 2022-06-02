import React from "react";
import "./CheckoutProduct.css";
import Star from "@mui/icons-material/Star";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = ({image, title, price, rating, id}) =>{
 const [{basket}, dispatch] = useStateValue();

 const removeFromBasket = () =>{
   console.log("remove item from basket");
 dispatch({
   type: 'REMOVE_FROM_BASKET',
    id: id,

 })

}
 
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p style={{margin:"3px",color:"gold"}}>
                <Star />
              </p>
            ))}
        </div>
        <button onClick={removeFromBasket} >Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
