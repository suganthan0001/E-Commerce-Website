import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isScrolled, isLogged,cartArray}) {
  const navbarStyle = {
    backgroundColor: isScrolled ? "#cee87b" : "transparent",
  };
  console.log(isLogged);
  return (
    <nav style={navbarStyle}>
      <div className="nav-left">
        <Link to="/">Everything</Link>
        <Link to="/">Groceries</Link>
        <Link to="/">Juice</Link>
      </div>
      <Link to="/">
        <img className="companyLogo" src="./images/companyLogo.png" alt="Company Logo" />
      </Link>
      <div className="nav-right">
      {cartArray.length>0 && <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i></Link>}
      {!isLogged && <Link to="/login" ><button className="btn">Log in</button></Link>}
      {!isLogged && <Link to="/signup" ><button className="btn">Sign up</button></Link>}
      {
        isLogged && <>
            <Link to="/">Profile</Link>
            <Link to="/likedItems">Liked Items</Link>
        </>
      }
      </div>
    </nav>
  );
}

export default Navbar;
