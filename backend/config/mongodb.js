import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`
      // await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")

      );
  
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
} 
export default connectDB;