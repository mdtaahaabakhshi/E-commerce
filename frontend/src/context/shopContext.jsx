import { useContext, createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  const addToCart = async (productId, size) => {

    if ( !size) {
      toast.error("Select Product Size " ,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setCartItems((prevCartItems) => {
      if (prevCartItems[productId]) {
        if (prevCartItems[productId][size]) {
          prevCartItems[productId][size] += 1;
          return { ...prevCartItems };
        } else {
          prevCartItems[productId][size] = 1;
          return { ...prevCartItems };
        }
      } else {
        prevCartItems[productId] = {};
        prevCartItems[productId][size] = 1;
        return { ...prevCartItems };
      }
    });
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    setCartItems,
  };

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
