import { port } from "./api-config.json";

async function postDevice(device) {
  const { hostname } = location;
  let res = await fetch(`http://${hostname}:${port}/devices/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(device),
  });

  let data = await res.json();

  // Assuming res is valid json and is a http error. log the error and throw one.
  if (!res.ok) {
    console.log(data);
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return data;
}

export default postDevice;
