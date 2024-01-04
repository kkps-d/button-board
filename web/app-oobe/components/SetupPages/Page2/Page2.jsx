import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import getDevices from "../../../api/getDevices";

function Page2({ setPage, setDeviceInfo }) {
  const [option, setOption] = useState("new-device");
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function onError(err) {
    setError(`${err.message}. Please try again.`);
    setIsLoading(false);
  }

  // Fetch devices on select-existing
  function onValueChange(value) {
    setError(null);
    if (value === "select-existing") {
      setIsLoading(true);
      getDevices()
        .then((data) => {
          setIsLoading(false);
          setDevices(data);
          setOption(value);
        })
        .catch(onError);
    } else {
      setOption(value);
    }
  }

  function onNextPage() {
    // If select-existing, set device info before going to next page
    if (option === "select-existing") {
      const selectedDeviceFullInfo = devices.find(
        (device) => selectedDevice === device.id
      );
      setDeviceInfo(selectedDeviceFullInfo);
    } else {
      // Otherwise, make sure its null in case user backs and selects new device
      setDeviceInfo(null);
    }
    setPage((page) => page + 1);
  }

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left gap-2">
        <p className="text-lg">Another device has already been set up.</p>
        <RadioGroup
          value={option}
          onValueChange={onValueChange}
          className="text-sm"
          label="Would you like to select an existing device, or register a new one?"
        >
          <Radio value="new-device">Register a new device</Radio>
          <Radio value="select-existing">Select an existing device</Radio>
        </RadioGroup>
        {option === "select-existing" && (
          <>
            <Spacer />
            <Select
              selectedKeys={[selectedDevice]}
              onChange={(e) => setSelectedDevice(e.target.value)}
              items={devices}
              placeholder="Select a device"
            >
              {(device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              )}
            </Select>
          </>
        )}
      </CardBody>
      {isLoading && <Progress className="h-1 -mb-1" isIndeterminate />}
      {error && (
        <div className="py-2 text-center text-danger-500 text-sm bg-danger-50">
          {error}
        </div>
      )}
      <CardFooter>
        <Button onClick={() => setPage((page) => page - 1)} variant="light">
          Back
        </Button>
        <div className="flex-grow"></div>
        <Button
          isDisabled={
            isLoading ||
            (option === "select-existing" && selectedDevice === null)
          }
          onClick={onNextPage}
          color="primary"
        >
          Next
        </Button>
      </CardFooter>
    </>
  );
}

export default Page2;
