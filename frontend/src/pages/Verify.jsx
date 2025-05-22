import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Verify = () => {
  const { navigate, isLoggedIn, setCartItems, backendUrl } =
    useContext(ShopContext);
  const [params] = useSearchParams();
  const success = params.get("success");
  const session_id = params.get("session_id");
  //   const orderId=params.get('orderId')

  const verifyPayment = async () => {
    try {
      if (!isLoggedIn) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, session_id },
        { withCredentials: true }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [isLoggedIn]);
  return <div></div>;
};

export default Verify;
