import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { checkUser } from "../middleware/auth.js";

const router = express.Router();
const JWT_SECRET = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp";
const JWT_EXPIRES_IN = "7d";

// Helper function to generate JWT
const generateToken = (userId) => 
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// GET login page
router.get("/login", (req, res) => res.send("Login Page"));

// POST login (protected)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET signup page
router.get("/signup", (req, res) => res.send("Signup Page"));

// POST signup (protected)
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/profile", checkUser, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(404).json({ message: "User not found" }); // Handle missing user
      }
      
      res.json(req.user); 
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
export default router;
