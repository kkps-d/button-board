import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
} from "@nextui-org/react";
import Logo from "../../../../common/components/Logo/Logo";
import { useState } from "react";
import getDevices from "../../../../common/api/getDevices";
import useLocalObjectStorage from "../../../../common/hooks/useLocalObjectStorage";

function Page1({ setPage }) {
  const [device] = useLocalObjectStorage("device", {});
  const deviceExists = !(device?.name === undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function onError(err) {
    setError(`${err.message}. Please try again.`);
    setIsLoading(false);
  }

  function onGoToApp() {
    window.location.replace(window.location.origin + "/app/"); // @TODO redo the routes
  }

  function onNextPage() {
    setError(null);
    setIsLoading(true);
    getDevices()
      .then((data) => {
        setIsLoading(false);
        if (data.length > 0) setPage(1);
        else setPage(2);
      })
      .catch(onError);
  }

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Welcome
      </CardHeader>
      {deviceExists ? (
        <CardBody className="flex flex-col gap-2 text-center">
          <p className="text-lg">
            Thanks for using <Logo></Logo>!
          </p>
          <p>
            Your device has been set up already as <br /> &quot;{device.name}
            &quot;
          </p>
          <p className="text-default-500 text-sm">
            Press <b>Go to app</b> to go to the app, <br />
            or <b>Continue setup</b> to go run the setup process again. <br />
            This will clear the configuration on this device.
          </p>
        </CardBody>
      ) : (
        <CardBody className="flex flex-col gap-2 text-center py-10">
          <p className="text-lg">
            Thanks for using{" "}
            <span className="font-bold">
              <br />
              <Logo className="inline" />
            </span>
            !
          </p>
          <p className="text-default-500 text-sm">
            Let&apos;s get your device set up
          </p>
        </CardBody>
      )}
      {isLoading && <Progress className="h-1 -mb-1" isIndeterminate />}
      {error && (
        <div className="py-2 text-center text-danger-500 text-sm bg-danger-50">
          {error}
        </div>
      )}
      <CardFooter>
        {deviceExists ? (
          <>
            <Button onClick={onNextPage} variant="light">
              Continue setup
            </Button>
            <div className="flex-grow"></div>
            <Button isDisabled={isLoading} onClick={onGoToApp} color="primary">
              Go to app
            </Button>
          </>
        ) : (
          <>
            <div className="flex-grow"></div>
            <Button isDisabled={isLoading} onClick={onNextPage} color="primary">
              Next
            </Button>
          </>
        )}
      </CardFooter>
    </>
  );
}

export default Page1;
