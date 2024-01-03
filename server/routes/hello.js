import express from "express";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("ALLO!");
});

export default router;
