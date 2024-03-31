import express from "express";
import { JSONFilePreset } from "lowdb/node";
import apiErrors from "../enums/api-errors.js";

import { v4 as uuid } from "uuid";
import { DB_DEFAULT, DB_PATH } from "../db-config.js";

const router = express.Router();
const db = await JSONFilePreset(DB_PATH, DB_DEFAULT);

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
  const keysToCheckFor = [
    "name",
    "defaultGridSize",
    "defaultDisplayMode",
    "resolution",
    "manualDimensions",
    "recommendedDimensions",
  ];
  const keysNotIncluded = [];

  console.log(req.body);

  // Check for the required keys in the request
  keysToCheckFor.forEach((key) => {
    if (!(key in req.body)) {
      keysNotIncluded.push(key);
    }
  });

  if (keysNotIncluded.length > 0) {
    res.status(400).json({
      error: apiErrors.INCOMPLETE_OR_NO_DATA,
      missing_keys: keysNotIncluded,
    });
    return;
  }

  const newDevice = {
    ...req.body,
    id: uuid(),
    boards: [],
  };

  db.update(({ devices }) => devices.push(newDevice));
  res.status(201).json(newDevice);
});

router.patch("/", (req, res) => {
  if (!req.body.id) {
    res.status(400).json({
      error: apiErrors.INCOMPLETE_OR_NO_DATA,
      missing_keys: ["id"],
    });
    return;
  }

  // Find the device with the id in the db
  const { devices } = db.data;
  let device = devices.find((d) => d.id === req.body.id);
  if (!device) {
    res.status(404).json({ error: apiErrors.DEVICE_NOT_FOUND });
    return;
  }

  // Update properties of device
  db.update(({ devices }) => {
    const i = devices.findIndex((d) => d.id === req.body.id);
    devices[i] = { ...devices[i], ...req.body };
    device = devices[i];
    return devices;
  });

  res.status(200).json(device);
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
