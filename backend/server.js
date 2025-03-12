import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
const MONGO_URL="mongodb://127.0.0.1:27017/LeetClone";

import userRoutes from "./routes/userRoute.js"; 
import problemRoutes from "./routes/problemRoute.js"; 

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Connect to MongoDB
main()
.then((result)=>{
    console.log("connected to databases successfully");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.use("/user", userRoutes);
app.use("/problems", problemRoutes);

// Default Route
app.get("/", (req, res) => res.send("LeetCode Clone API is running..."));

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
