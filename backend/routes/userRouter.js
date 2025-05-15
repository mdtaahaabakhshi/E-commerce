import express from 'express';
import { loginUser, registerUser,adminLogin,logoutUser } from '../controllers/userController.js';

const userRouter = express.Router();

 userRouter.post('/login', loginUser);
 userRouter.post('/register', registerUser);
 userRouter.post('/admin', adminLogin);
 userRouter.post('/logout', logoutUser);

export default  userRouter;