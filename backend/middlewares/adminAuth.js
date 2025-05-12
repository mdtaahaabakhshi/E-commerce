import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const {token} = req.headers;
console.log( "admin" ,token);
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

   const token_decoded= jwt.verify(token, process.env.JWT_SECRET);
    if (token_decoded !== process.env.ADMIN_EMAIL && token_decoded !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ message: "Not Authorized Login Again" ,message:error.message});
    }
    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default adminAuth;
