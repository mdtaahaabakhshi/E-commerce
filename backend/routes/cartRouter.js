import express, { Router } from 'express';
import { addToCart,updateCart,getUserCart } from '../controllers/cartController.js';
import userAuth from '../middlewares/userAuth.js';

const cartRouter =express.Router();

cartRouter.post('/add',userAuth,addToCart);
cartRouter.get('/get',userAuth,getUserCart);
cartRouter.post('/update',userAuth,updateCart);

export default cartRouter;