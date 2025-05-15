import jwt from "jsonwebtoken";
import { adminLogin } from "../controllers/userController.js";

const adminAuth = (req, res, next) => {
  // const {token} = req.headers;
// console.log( "admin" ,token);
const token = req.cookies.token
// if (!token) {
// //   return res.status(401).json({ message: "Unauthorized Access!" });
// // }
//   return res.status(401).json({ message: "Unauthorized Access!" });
// }

 if (!token) return res.json({ success: false ,message:"Unauthorized Access!"});
  try {
    // else{
    //   jwt.verify(token, process.env.JWT_SECRET);
    //     next();
    // }
   const token_decoded= jwt.verify(token, process.env.JWT_SECRET);
    if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success:false, message: "Not Authorized Login Again" ,message:error.message});
    }
    next();
  } catch (error) {
    console.log("Error in adminAuth middleware:",error.message);
    return res.status(500).json({ success:false,message: error.message });
  }
  }
export default adminAuth;
