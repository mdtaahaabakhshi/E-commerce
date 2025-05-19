import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

//*placing orders using COD Method
const placeOrder = async (req, res) => {

  try {
    
  
   const userId = req.userId;

  const { items, amount, address } = req.body;

  const newOrder = new orderModel({
    userId,
    items,
    address,
    amount,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  });
  await newOrder.save();

  await orderModel.findByIdAndUpdate(userId, { cartData: {} });
  //!clearing cartData after order placed
  await UserModel.findByIdAndUpdate(userId, { cartData: {} });
res.json({success:true,message:"Order Placed"})

  }
   catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
};

//*placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {};

//*placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {};

//*All Orders data for Admin Panel
const allOrders = async (req, res) => {};

//*User Order Data for Frontend
const userOrders = async (req, res) => {
try {
  const userId= req.userId
const orders =await orderModel.find({userId})
res.json({success:true,orders})
} catch (error) {
  console.log(error)
  res.json({success:false,message:error.message})
}

};

//*Update order status from Admin Panel

const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
