import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {

const token = req.cookies.token

 if (!token) return res.json({ success: false ,message:"Unauthorized User!"});
  try {
   const token_decoded= jwt.verify(token, process.env.JWT_SECRET);
req.userId =token_decoded.id
   next();
  } catch (error) {
    console.log("Error in userAuth middleware:",error.message);
    return res.status(500).json({ success:false,message: error.message });
  }
  }
export default userAuth;


