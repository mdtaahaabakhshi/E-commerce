import express from 'express';
import { loginUser, registerUser,adminLogin,logoutUser ,check, logoutAdmin} from '../controllers/userController.js';
import adminAuth from '../middlewares/adminAuth.js';

const userRouter = express.Router();

 userRouter.post('/login', loginUser);
 userRouter.post('/register', registerUser);
 userRouter.post('/admin', adminLogin);
 userRouter.post('/logoutUser', logoutUser);
 userRouter.post('/logoutAdmin', logoutAdmin);
 userRouter.get('/admin/check', adminAuth, (req, res) => {
  res.json({ success: true });
});
 userRouter.get('/check',check)
 


export default  userRouter;