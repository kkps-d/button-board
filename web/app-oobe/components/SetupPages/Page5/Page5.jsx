import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
} from "@nextui-org/react";

function Page5({ setPage, deviceInfo, setDeviceInfo }) {
  function onNextPage() {}

  const {
    name,
    defaultGridSize,
    defaultDisplayMode,
    resolution,
    recommendedDimensions,
    manualDimensions,
  } = deviceInfo;

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
      <CardFooter>
        <Button onClick={() => setPage((page) => page - 1)} variant="light">
          Back
        </Button>
        <div className="flex-grow"></div>
        <Button variant="shadow" onClick={onNextPage} color="primary">
          Register Device
        </Button>
      </CardFooter>
    </>
  );
}

export default Page5;
