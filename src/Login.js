import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import {auth} from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
const history =   useNavigate();
const [email, setEmail] = React.useState("");
const [password, setPassword] = React.useState("");

const signIn = e =>{
  e.preventDefault();

  signInWithEmailAndPassword(auth,email, password)
  .then(cred =>{
    console.log(cred);
    history('/');
  }
  )
  .catch(error =>{
    console.log(error);
  }
  )
}
const register = e =>{
  console.log("register");
  e.preventDefault();
  createUserWithEmailAndPassword(auth,email,password).then(
    (Auth) =>{
      console.log(Auth)
    }
  ).catch(
    (error) =>{
      alert(error.message)
    }
  )
}
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="login__signInButton"  type="submit" onClick={signIn}>Sign In </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and var
          nterest-Based Ads Notice:-
        </p>

        <button className="login__registerButton" onClick={register}>create your Amazone Account </button>

      </div>

    </div>
  );
}

export default Login;
