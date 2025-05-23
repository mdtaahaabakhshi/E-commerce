import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectToCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import cookieParser from 'cookie-parser';

//* App config
const app = express();  
const PORT = process.env.PORT || 5000;
connectDB();
connectToCloudinary();

//* Middleware
app.use(cors({
  origin: ["http://localhost:5174","http://localhost:5173"] ,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//* api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});