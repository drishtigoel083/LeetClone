import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("http://localhost:3000/user/login"); 
  }

  jwt.verify(token, "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp", async (err, decodedToken) => {
    if (err) {
      return res.redirect("http://localhost:3000/user/login");
    }

    try {
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.redirect("http://localhost:3000/user/login"); 
      }

      req.user = user; 
      next();
    } catch (error) {
      return res.status(500).json({ status: false, message: "Server error." });
    }
  });
};
