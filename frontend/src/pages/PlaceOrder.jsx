import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl,cartItems,setCartItems ,isLoggedIn,getCartAmount,delivery_fee, products } = useContext(ShopContext);

  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((data) => ({
      ...data,
      [name]: value,
    }));
  };
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id == productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
let orderData={
  address:formdata,
  items:orderItems,
  amount:getCartAmount() + delivery_fee
}

switch (method) {
  //API Call for COD
  case 'cod':
  const response= await axios.post(backendUrl+'/api/order/place',orderData,{withCredentials:true})
    if (response.data.success) {
      toast.success(response.data.message,{
           draggable: true,
        })
      setCartItems({})
        navigate('/orders')
    }
    else{
      toast.error(response.data.message,{
           draggable: true,
        })
    }
    break;

case 'stripe':
const responseStripe= await axios.post(backendUrl+'/api/order/stripe',orderData,{withCredentials:true})
if(responseStripe.data.success){
  const {session_url}=responseStripe.data
  window.location.replace(session_url)
}
{
  toast.error(responseStripe.data.message)
}  break;

  default:
    break;
}
    } catch (error) {
console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div>
          <div className="flex gap-3">
            <input
              type="text"
              onChange={onChangeHandler}
              name="firstName"
              value={formdata.firstName}
              placeholder="First name"
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
            <input
              type="text"
              onChange={onChangeHandler}
              name="lastName"
              value={formdata.lastName}
              placeholder="Last name"
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            />
          </div>
        </div>
        <input
          type="email"
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          placeholder="email address"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          onChange={onChangeHandler}
          name="street"
          value={formdata.street}
          placeholder="Street"
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formdata.city}
            placeholder="City"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formdata.state}
            placeholder="State"
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            name="zipcode"
            required
            value={formdata.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            name="country"
            required
            value={formdata.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          required
          placeholder="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          {/* Payment Method Collection  */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-700" : ""
                } `}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-700" : ""
                } `}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-700" : ""
                } `}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-ful text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
