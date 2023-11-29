// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/Search";
import Product from "./components/Product";
import LoginForm from "./components/LoginForm";
import LikedItems from "./components/LikedItems";
import Cart from "./components/Cart";
import data from "./products.json";
import Signup from "./components/Signup";

function App() {
  const [searchContent, setSearchContent] = useState("");
  const [isNavbarScrolled, setNavbarScrolled] = useState(false);
  const [isLogIn, setisLogIn] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  function addToCart(productId){
    setcartItems((prevItems) => {
      return [...prevItems, productId];
    })
  }
  
  const updateLikedItems = (newLikedItems) => {
    setLikedItems(newLikedItems);
  };

  function handleLogin() {
    setisLogIn(true);
  }

  const handleLikeToggle = (productId) => {
    const isLiked = likedItems.some((item) => item.id === productId);

    if (isLiked) {
      setLikedItems((prevLikedItems) =>
        prevLikedItems.filter((item) => item.id !== productId)
      );
    } else {
      const likedProduct = data.products.find(
        (product) => product.id === productId
      );
      setLikedItems((prevLikedItems) => [...prevLikedItems, likedProduct]);
    }
  };


  const handleSearch = (value) => {
    setSearchContent(value);
  };

  const filteredProducts = data.products.filter((product) =>
    product.name.toLowerCase().includes(searchContent.toLowerCase())
  );

  const productsArray = filteredProducts.map((eachItem) => (
    <Product
      item={eachItem}
      key={eachItem.id}
      onLikeToggle={() => handleLikeToggle(eachItem.id)}
      isLogged={isLogIn}
      initialIsLiked={likedItems.some((item) => item.id === eachItem.id)}
      addToCart = {addToCart}
    />
  ));

  const handleScroll = () => {
    const scrolled = window.scrollY > 50;
    setNavbarScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <>
        <Navbar isScrolled={isNavbarScrolled} isLogged={isLogIn} cartArray = {cartItems}/>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                {productsArray.length > 0 ? (
                  <div className="products-container">{productsArray}</div>
                ) : (
                  <div className="products--notFound">
                    <h2>Products Not Found</h2>
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={<LoginForm loginSuccess={handleLogin} />}
          />
          <Route
            path="/likedItems"
            element={
              <LikedItems
                likedItems={likedItems}
                isLogged={isLogIn}
                onLikeToggle={handleLikeToggle}
                updateLikedItems={updateLikedItems}
              />
            }
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route 
            path="/cart"
            element = {
            <Cart 
              cartItems = {cartItems}
            />
          }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
