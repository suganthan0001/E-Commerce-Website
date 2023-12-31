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
import Checkout from "./components/Checkout";
import Back from "./components/Back";
function App() {
  const [searchContent, setSearchContent] = useState("");
  const [isNavbarScrolled, setNavbarScrolled] = useState(false);
  const [isLogIn, setisLogIn] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [productsWithFreq, setProductsWithFreq] = useState({});

  const [stripeList, setStripeList] = useState([]);

  async function checkoutStripe(){

    await fetch("https://organic-store-9jki.onrender.com/checkout", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(stripeList)
    }).then((response) => {
      return response.json();
    } ).then( (response) => {
      if(response.url){
        window.location.assign(response.url);
      }
    } )
  }

  function updateStripe(){
    Object.keys(productsWithFreq).forEach( (item) => {
      let quantity = productsWithFreq[item];
      console.log(item);
      var id;
      if(item == 1){
        id = "price_1ORZ33SHT8qeCdBLg44Isn5r"
      }else if(item == 2){
        id = "price_1ORZ5uSHT8qeCdBLLrwO01Wi"
      }else if(item == 3){
        id = "price_1ORZ77SHT8qeCdBL1tO3hLoF"
      }else if(item == 4){
        id = "price_1ORZ6MSHT8qeCdBLv1dF2EyR"
      }else if(item == 5){
        id = "price_1ORZ6fSHT8qeCdBLDTKbT1di"
      }else{
        console.log("NO match");
      }

      setStripeList( (oldList) => {
        return [...oldList, {id: id,quantity: quantity}]
      } )
    } )
    console.log(stripeList);
    if(stripeList.length > 0){
      checkoutStripe();
    }
  }

  const updateProductsWithFreq = (cartItems) => {
    const productsWithFreq = {};
    cartItems.forEach((id) => {
      if (id in productsWithFreq) {
        productsWithFreq[id] += 1;
      } else {
        productsWithFreq[id] = 1;
      }
    });
    return productsWithFreq;
  };

  useEffect(() => {
    const updatedProductsWithFreq = updateProductsWithFreq(cartItems);
    setProductsWithFreq(updatedProductsWithFreq);
  }, [cartItems]);


  function increment(id) {
    setProductsWithFreq(
      (oldFreq) => {
        var toIncrease = productsWithFreq[id] + 1;
        return { ...oldFreq, [id]: toIncrease }
      }
    )

    setcartItems(
      (oldItems) => {
        return [...oldItems, id]
      }
    )
  }

  function decrement(id) {
    setProductsWithFreq(
      (oldFreq) => {
        var toDecrease = productsWithFreq[id] - 1;
        if (toDecrease == 0) {
          return { ...oldFreq }
        }
        return { ...oldFreq, [id]: toDecrease }
      }
    )
  }


  function addToCart(productId) {
    setcartItems((prevItems) => {
      return [...prevItems, productId];
    })
  }

  function deleteFromMainCart(id) {
    setcartItems((prevItems) => {
      const withDeletedItem = prevItems.filter(item => item != id)
      return withDeletedItem;
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
      addToCart={addToCart}
      productsWithFreq={productsWithFreq}
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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar isScrolled={isNavbarScrolled} isLogged={isLogIn} cartArray={cartItems} />
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
            element={
              <>
                <Navbar isScrolled={isNavbarScrolled} isLogged={isLogIn} cartArray={cartItems} />
                <LoginForm loginSuccess={handleLogin} />
              </>
            }
          />
          <Route
            path="/likedItems"
            element={
              <>
                <Navbar isScrolled={isNavbarScrolled} isLogged={isLogIn} cartArray={cartItems} />
                <LikedItems
                  likedItems={likedItems}
                  isLogged={isLogIn}
                  onLikeToggle={handleLikeToggle}
                  updateLikedItems={updateLikedItems}
                  productsWithFreq={productsWithFreq}
                  addToCart={addToCart}
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar isScrolled={isNavbarScrolled} isLogged={isLogIn} cartArray={cartItems} />
                <Signup />
              </>

            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar isScrolled={isNavbarScrolled} isLogged={isLogIn} cartArray={cartItems} />
                <Cart
                  productsWithFreq={productsWithFreq}
                  increment={increment}
                  decrement={decrement}
                  deleteFromMainCart={deleteFromMainCart}
                  cartItems={cartItems}
                />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
              <Back />
              <Checkout data={data} productsWithFreq={productsWithFreq} updateStripe={updateStripe}/>
              </>
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
