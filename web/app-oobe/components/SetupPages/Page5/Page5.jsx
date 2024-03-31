import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
  Spacer,
} from "@nextui-org/react";
import postDevice from "../../../../common/api/postDevice";
import { useState } from "react";
import useLocalObjectStorage from "../../../../common/hooks/useLocalObjectStorage";
import patchDevice from "../../../../common/api/patchDevice";

function Page5({ setPage, deviceInfo, setupMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [device, saveDevice] = useLocalObjectStorage("device", {});

  const {
    name,
    defaultGridSize,
    defaultDisplayMode,
    resolution,
    recommendedDimensions,
    manualDimensions,
  } = deviceInfo;

  function onError(err) {
    setError(`${err.message}. Please try again.`);
    setIsLoading(false);
  }

  function onRegister() {
    setError(null);
    setIsLoading(true);

    if (setupMode === "existing-device") {
      patchDevice(deviceInfo)
        .then((result) => {
          setIsLoading(false);
          saveDevice(result);
          setPage((page) => page + 1);
        })
        .catch(onError);
      setIsLoading(false);
    } else {
      postDevice(deviceInfo)
        .then((result) => {
          setIsLoading(false);
          saveDevice(result);
          setPage((page) => page + 1);
        })
        .catch(onError);
    }
  }

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left gap-2">
        <p className="text-lg">Confirm your configuration</p>
        <p>
          <span className="text-default-500">Device name: </span>
          <b>{name}</b>
        </p>
        <p>
          <span className="text-default-500">Display: </span>
          <b>
            {defaultDisplayMode.charAt(0).toUpperCase() +
              defaultDisplayMode.slice(1)}
          </b>
          ,{" "}
          <b>
            {resolution.w} x {resolution.h}
          </b>
        </p>
        <p>
          <span
            className={`${
              manualDimensions ? "text-warning" : "text-default-500"
            }`}
          >
            Board dimensions:{" "}
          </span>
          <span className={manualDimensions ? "text-warning" : ""}>
            <b>
              {manualDimensions
                ? manualDimensions.rows
                : recommendedDimensions.rows}
            </b>{" "}
            rows,{" "}
            <b>
              {manualDimensions
                ? manualDimensions.cols
                : recommendedDimensions.cols}
            </b>{" "}
            columns
          </span>
        </p>
        <Spacer />
        <p className="text-default-500 text-sm">
          Click the <b>Back</b> button to make any changes
        </p>
      </CardBody>
      {isLoading && <Progress className="h-1 -mb-1" isIndeterminate />}
      {error && (
        <div className="py-2 text-center text-danger-500 text-sm bg-danger-50">
          {error}
        </div>
      )}
      <CardFooter>
        <Button
          onClick={() => setPage((page) => page - 1)}
          variant="light"
          isDisabled={isLoading}
        >
          Back
        </Button>
        <div className="flex-grow"></div>
        <Button
          variant="shadow"
          onClick={onRegister}
          color="primary"
          isDisabled={isLoading}
        >
          {setupMode === "existing-device"
            ? "Select Device"
            : "Register Device"}
        </Button>
      </CardFooter>
    </>
  );
}

export default Page5;
