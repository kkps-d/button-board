import express from "express";
import cors from "cors";
import path from "node:path";

// Routes
import hello from "./routes/hello.js";
import devices from "./routes/devices.js";
import bodyParser from "body-parser";

const HTTP_PORT = 3000;
const SOCKET_IO_PORT = 3001;

const app = express();

console.log(`[index] '${process.env.NODE_ENV}' mode`);

// Middleware
if (process.env.NODE_ENV === "dev") {
  console.log(`[index] Enabling CORS middleware for dev mode`);
  app.use(cors());
}
app.use(bodyParser.json());

// Static routes
app.use("/assets", express.static("../web/dist/assets"));

// App routes
app.all("/", (req, res) => {
  res.redirect("/get-started");
});

app.use("/get-started", (req, res) => {
  res.sendFile(
    path.resolve(path.join("..", "web", "dist", "app-oobe", "index.html"))
  );
});

// REST API Routes
app.use("/devices", devices);

app.listen(HTTP_PORT, () => {
  console.log(`[index] HTTP server listening on port ${HTTP_PORT}`);
});
