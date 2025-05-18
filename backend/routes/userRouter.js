import express from 'express';
import { loginUser, registerUser,adminLogin,logoutUser , logoutAdmin} from '../controllers/userController.js';
import adminAuth from '../middlewares/adminAuth.js';
import userAuth from '../middlewares/userAuth.js';


const userRouter = express.Router();

 userRouter.post('/login', loginUser);
 userRouter.post('/register', registerUser);
 userRouter.post('/admin', adminLogin);
 userRouter.post('/logoutUser', logoutUser);
 userRouter.post('/logoutAdmin', logoutAdmin);
 userRouter.get('/admin/check', adminAuth, (req, res) => {
  res.json({ success: true });
});
 userRouter.get('/userAuth/check',userAuth, (req,res)=>{
  res.json({success:true})
 })
 


export default  userRouter;