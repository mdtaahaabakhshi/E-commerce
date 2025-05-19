import UserModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {

     const userId = req.userId; // get userId from authenticated user (set by userAuth)
  
        const {  productId, size } = req.body;

        const userData = await UserModel.findById(userId);
         if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let cartData = await userData.cartData;

        if (cartData[productId]) {
            if (cartData[productId][size]) {
                cartData[productId][size] += 1;
            } else {
                cartData[productId][size] = 1;
            }
        } else {
            cartData[productId] = {};
            cartData[productId][size] = 1;
        }

        await UserModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart!" });
     
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    const userId = req.userId;
    const {  productId, size, quantity } = req.body;
    try {
        const userData = await UserModel.findById(userId);

        let cartData = await userData.cartData;
        cartData[productId][size] = quantity;

        await UserModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData ;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
