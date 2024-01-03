import express from "express";
import { JSONFilePreset } from "lowdb/node";

const router = express.Router();
const db = await JSONFilePreset("storage/db.json", {});

// Test route
router.get("/", (req, res) => {
  const { devices } = db.data;
  res.send(devices.map((device) => ({ id: device.id, name: device.name })));
});

export default router;
