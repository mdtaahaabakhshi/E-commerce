import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Add from "./pages/Add";
import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$"
const App = () => {
  //   const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') :'' );

  // useEffect(()=>{
  //   localStorage.setItem('token',token)
  // },[token])
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    axios
      .get(backendUrl + "/api/user/admin/check",{ withCredentials: true })
      .then((res) => setIsLoggedIn(res.data.success))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer  />
      {isLoggedIn ? (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;
