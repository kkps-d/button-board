import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";

const CHARACTER_LIMIT = 30;

function Page3({ setPage, deviceInfo, setDeviceInfo }) {
  const [deviceName, setDeviceName] = useState(
    deviceInfo ? deviceInfo.name : ""
  );

  function onNextPage() {
    setDeviceInfo((info) => ({ ...info, name: deviceName }));
    setPage((page) => page + 1);
  }

  function onInput(e) {
    const value = e.target.value;
    if (value.length > CHARACTER_LIMIT) return;
    setDeviceName(e.target.value);
  }

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left gap-2">
        <p className="text-lg">Name your device</p>
        <Input
          onClear={() => setDeviceName("")}
          onInput={onInput}
          placeholder="Device name"
          endContent={
            <div className="text-sm">{CHARACTER_LIMIT - deviceName.length}</div>
          }
          isRequired
          value={deviceName}
        ></Input>
      </CardBody>
      <CardFooter>
        <Button onClick={() => setPage((page) => page - 1)} variant="light">
          Back
        </Button>
        <div className="flex-grow"></div>
        <Button
          isDisabled={deviceName.length === 0}
          onClick={onNextPage}
          color="primary"
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
}

export default Page3;
