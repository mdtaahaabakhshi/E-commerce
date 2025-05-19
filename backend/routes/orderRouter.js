import express from 'express'
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} from '../controllers/orderController.js'
import userAuth from '../middlewares/userAuth.js';
import adminAuth from "../middlewares/adminAuth.js";

const orderRouter =express.Router()

//* Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//*Payment Feature/s
orderRouter.post('/place',userAuth,placeOrder)
orderRouter.post('/stripe',userAuth,placeOrderStripe)
orderRouter.post('/razorpay',userAuth,placeOrderRazorpay)

//* User Features

orderRouter.get('/userorders',userAuth,userOrders)

export default orderRouter