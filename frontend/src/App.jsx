import React,{ useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import { ShopContext } from "./context/shopContext";
import axios from "axios";
const App = () => {

  const { backendUrl, navigate, isLoggedIn, setIsLoggedIn } =
    useContext(ShopContext);

  //     useEffect(() => {
  //   axios
  //     .get(backendUrl + "/api/user/check",{ withCredentials: true })
  //     .then((res) => setIsLoggedIn(res.data.success))
  //     .catch(() => setIsLoggedIn(false));
  // }, []);
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
         <ToastContainer />
      <Navbar />
      <SearchBar />
     <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/collection" element={<Collection />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/placeOrder" element={<PlaceOrder />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes> 
      <Footer/>
    </div>
  );
};

export default App;
