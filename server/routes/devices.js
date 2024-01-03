import express from "express";
import { JSONFilePreset } from "lowdb/node";
import apiErrors from "../enums/api-errors.js";

import { v4 as uuid } from "uuid";

const router = express.Router();
const db = await JSONFilePreset("storage/db.json", {});

router.get("/", (req, res) => {
  const { devices } = db.data;
  res.send(
    devices.map((device) => {
      const { boards, ...theRest } = device;
      return theRest;
    })
  );
});

router.post("/", (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  if (!name) {
    res.status(400).json({ error: apiErrors.DEVICE_NAME_NOT_PROVIDED });
    return;
  }
  const newDevice = {
    id: uuid(),
    name,
    boards: [],
  };
  db.update(({ devices }) => devices.push(newDevice));
  res.status(201).json(newDevice);
});

router.get("/:id", (req, res) => {
  const { devices } = db.data;
  const id = req.params.id;
  const device = devices.find((device) => device.id === id);
  if (!device) {
    res.status(404).json({ error: apiErrors.DEVICE_NOT_FOUND });
    return;
  }
  res.send(device);
});

router.get("/:id/boards", (req, res) => {
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
