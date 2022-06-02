import React from "react";
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom';
import {useStateValue} from "./StateProvider"
import { signOut } from "firebase/auth";
import {auth} from './firebase';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const Header = () => {
  
const [{basket,user }, dispatch] = useStateValue()

const handleAuthentication=()=>{
if(user){
  signOut(auth)
}
}

    return (
    <div className="header">
    <Link to="/">
      <img className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
      ></img></Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon"/>
      </div>
      <div className="header__nav">

        <Link to={!user && `/login`} className="header__link">
        <div   onClick={handleAuthentication} className="header__option">
          <span className="header__optionLineOne">Hello, {!user?'Guest':user.email}</span>

          <span className="header_optionLineTwo"> {user?'SignOut' :'SignIn' }</span>
        </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header_optionLineTwo"> Prime</span>
        </div>
        <div className="mobileBar">
          <DensityMediumIcon/>
        </div>

        <Link to="/checkout">
        <div className="header__optionBasket">
<ShoppingBasketIcon />
<span className="header_optionLineTwo header_basketCount">
{basket?.length}</span>
</div>
</Link>

      </div>
    </div>
  );
};

export default Header;
