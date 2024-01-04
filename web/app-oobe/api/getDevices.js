import { port } from "./api-config.json";

function getDevices(setDevices) {
  const { hostname } = location;
  fetch(`http://${location}:${port}/devices`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setDevices(data);
    });
}

export default getDevices;
