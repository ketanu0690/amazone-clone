import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Order from "./Order";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from './firebase';
import { useEffect } from "react";
import {useStateValue} from './StateProvider';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';


const promise  = loadStripe(
  "pk_test_51L5shmSHSqj4QW43JOZoKNLeauTjWeVRAvMSC704Ue1yZ2dDwv8nNiXDmXnjpzywXAHQoCT3ln15O9W1UMFjVIIZ00TPQuV4UC"
);

function App() {
const [{}, dispatch] = useStateValue();

useEffect(()=>{
  auth.onAuthStateChanged(authuser=>{
    if(authuser){
      console.log("LOGED IN")
      // console.log(authuser.email);
      dispatch({
        type:'SET_USER',
        user:authuser
      })
       
    }
    else{
      console.log("logout")
      dispatch({
        type:'SET_USER',
        user:null
      })
    }
  })
},[])
 
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>}></Route>
          <Route path="/orders" element={<Order></Order>}></Route>
          
        </Routes>
      </div>
    </Router>
  );
  
}
export default App;
