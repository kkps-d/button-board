import { port } from "./api-config.json";

async function getDeviceById(id) {
  const { hostname } = location;
  let res = await fetch(`http://${hostname}:${port}/devices/${id}`);
  let data = await res.json();
  return data;
}

export default getDeviceById;
