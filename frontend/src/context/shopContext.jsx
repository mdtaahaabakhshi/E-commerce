import { useContext, createContext, useState, useEffect } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = (import.meta.env.VITE_BACKEND_URL =
    " http://localhost:5000");

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
 const[isLoggedIn,setIsLoggedIn]=useState(null)
  const addToCart = async (productId, size) => {
    if (!size) {
      toast.error("Select Product Size ", {
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

  const getCartCount = () => {
    let count = 0;
    for (const productId in cartItems) {
      try {
        for (const size in cartItems[productId]) {
          count += cartItems[productId][size];
        }
      } catch (error) {
        toast.error("Error! happened in cart");
      }
    }
    return count;
  };

  const updateQuantity = async (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let amount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const product = products.find((item) => item._id === productId);
        if (product) {
          amount += product.price * cartItems[productId][size];
        }
      }
    }
    return amount;
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", {
        withCredentials: true
      });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {

      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  
   useEffect(() => {
    axios
      .get(backendUrl + "/api/user/userAuth/check",{ withCredentials: true })
      .then((res) => setIsLoggedIn(res.data.success))
      .catch(() => setIsLoggedIn(false));
      
  }, []);

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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    isLoggedIn,
    setIsLoggedIn
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
