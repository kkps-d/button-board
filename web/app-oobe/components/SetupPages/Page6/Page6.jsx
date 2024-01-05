import { Button, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import useLocalObjectStorage from "../../../../common/hooks/useLocalObjectStorage";

function Page6({ setPage, deviceInfo, setDeviceInfo }) {
  const [device, saveDevice] = useLocalObjectStorage("device", {});

  function onFinish() {
    window.location.replace(window.location.origin + "/app");
  }

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left gap-2">
        <p className="text-lg">
          Your new device has been registered successfully!
        </p>
        <p className="text-default-500 text-sm">
          Press <b>Finish</b> to start using the app!
        </p>
        <p className="text-xs text-default-300">
          {device.name}, {device.id}
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex-grow"></div>
        <Button onClick={onFinish} color="primary">
          Finish
        </Button>
      </CardFooter>
    </>
  );
}

export default Page6;
