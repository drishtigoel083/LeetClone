import express from "express";
import Problem from "../models/problem.js";
import { checkUser } from "../middleware/auth.js";

const router = express.Router();

// GET problem by ID
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST verify solution (Protected Route)
router.post("/:id/verify", checkUser, async (req, res) => {
  const { code, language } = req.body;

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Mock function for evaluating the code
    const evaluateCode = (userCode, testCases) => {
      // here we will use the judge system
      return testCases.every(tc => executeCode(userCode, tc.input) === tc.output);
    };

    const executeCode = (userCode, input) => {
      return "mock_output"; 
    };

    const isCorrect = evaluateCode(code, problem.testCases);

    res.json({ success: isCorrect, message: isCorrect ? "Correct solution!" : "Wrong answer" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
