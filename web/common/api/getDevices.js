import { port } from "./api-config.json";

async function getDevices() {
  const { hostname } = location;
  let res = await fetch(`http://${hostname}:${port}/devices`);
  let data = await res.json();
  return data;
}

export default getDevices;
