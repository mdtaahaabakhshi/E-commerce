import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectToCloudinary from './config/cloudinary.js';
import router from './routes/userRoute.js';

//* App config
const app = express();  
const PORT = process.env.PORT || 5000;
connectDB();
connectToCloudinary();

//* Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* api endpoints
app.use('/api/user',router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});