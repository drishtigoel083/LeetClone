import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  problemsSolved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
  lastSubmittedCode: {
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    code: { type: String },
    language: { type: String },
  },
});

const User = mongoose.model("User", userSchema);

export default User; 

