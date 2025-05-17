import express from 'express';
import { loginUser, registerUser,adminLogin,logoutUser } from '../controllers/userController.js';
import adminAuth from '../middlewares/adminAuth.js';

const userRouter = express.Router();

 userRouter.post('/login', loginUser);
 userRouter.post('/register', registerUser);
 userRouter.post('/admin', adminLogin);
 userRouter.post('/logout', logoutUser);
 userRouter.get('/check', adminAuth, (req, res) => {
  res.json({ success: true });
});


export default  userRouter;