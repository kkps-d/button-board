import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import SettingsModal from "./components/SettingsModal/SettingsModal";
import { useLocalStorage } from "@uidotdev/usehooks";
import { BoardProvider } from "../common/contexts/BoardContext/BoardContext";
import useLocalObjectStorage from "../common/hooks/useLocalObjectStorage";
import getDeviceById from "../common/api/getDeviceById";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import apiErrors from "../../server/enums/api-errors";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [device, setDevice] = useLocalObjectStorage("device", {});
  const [bgImageUrl] = useLocalStorage("bgImageUrl", null);
  const settingsModalProps = useDisclosure();
  const errorModalProps = useDisclosure();
  const [errorType, setErrorType] = useState(null);
  const [errorReason, setErrorReason] = useState(null);

  useEffect(() => {
    // Check if device is setup by trying to read ID
    if (!device?.id) {
      console.log("Device ID not found, no set up yet");
      setErrorType("device-not-setup");
      errorModalProps.onOpen();
      return;
    }

    // Get updated data from server and save it
    getDeviceById(device.id)
      .then((updatedDevice) => {
        if (updatedDevice?.error === apiErrors.DEVICE_NOT_FOUND) {
          console.log("Device does not exist on server");
          setErrorType("device-not-on-server");
          errorModalProps.onOpen();
          return;
        } else {
          setDevice(updatedDevice);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorType("network-error");
        setErrorReason(error);
        errorModalProps.onOpen();
        return;
      });
  }, []);

  return (
    <BoardProvider>
      <div
        className={`h-svh flex flex-col relative bg-background text-foreground ${
          darkMode ? "dark" : "light"
        }`}
        style={{
          backgroundImage: `url("${bgImageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Nav
          onNavOpen={settingsModalProps.onOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        {/* <Button onClick={errorModalProps.onOpen}>test</Button> */}
        <SettingsModal
          darkMode={darkMode}
          settingsModalProps={settingsModalProps}
        />
        <ErrorModal
          darkMode={darkMode}
          settingsModalProps={errorModalProps}
          errorType={errorType}
          errorReason={errorReason}
        />
        <Body />
        <Footer device={device} />
      </div>
    </BoardProvider>
  );
}

export default App;
