import express, { Router } from 'express';
import { addToCart,updateCart,getUserCart } from '../controllers/cartController';
import userAuth from '../middlewares/userAuth';

const cartRouter =express.Router();

cartRouter.post('/get',userAuth,getUserCart);
cartRouter.post('/update',userAuth,updateCart);
cartRouter.post('/add',userAuth,addToCart);

export default cartRouter;