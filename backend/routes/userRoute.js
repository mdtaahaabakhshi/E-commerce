import express from 'express';
import { loginUser, registerUser,adminLogin } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/admin', adminLogin);

export default router;