import express from "express";

// Routes
import hello from "./routes/hello.js";
import devices from "./routes/devices.js";
import bodyParser from "body-parser";

const HTTP_PORT = 3000;
const SOCKET_IO_PORT = 3001;

const app = express();

app.use(bodyParser.json());

app.use("/", hello);
app.use("/devices", devices);

app.listen(HTTP_PORT, () => {
  console.log(`[index] HTTP server listening on port ${HTTP_PORT}`);
});
