import express from "express";
import Subject from "../models/Subject.js";
const router = express.Router();

// Add subject
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Subject.findOne({ name });
    if (existing) return res.status(400).json({ message: "Subject already exists" });

    const subject = new Subject({ name });
    await subject.save();
    res.json({ message: "Subject added", subject });
  } catch (err) {
    res.status(500).json({ message: "Error adding subject", error: err.message });
  }
});

// Get all subjects
router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

// Delete subject
router.delete("/:id", async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Subject deleted" });
});

export default router;
