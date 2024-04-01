import express from "express";
import { JSONFilePreset } from "lowdb/node";
import apiErrors from "../enums/api-errors.js";

import { DB_DEFAULT, DB_PATH } from "../db-config.js";

const router = express.Router({ mergeParams: true });
const db = await JSONFilePreset(DB_PATH, DB_DEFAULT);

router.get("/", (req, res) => {
  const { devices } = db.data;
  const id = req.params.id;
  const device = devices.find((device) => device.id === id);
  if (!device) {
    res.status(404).json({ error: apiErrors.DEVICE_NOT_FOUND });
    return;
  }
  res.send(device.boards);
});

export default router;
