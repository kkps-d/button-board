import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
  Spacer,
} from "@nextui-org/react";
import Logo from "../../Logo/Logo";
import { useEffect, useState } from "react";
import getDevices from "../../../api/getDevices";

function Page1({ setPage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function onError(err) {
    setError(`${err.message}. Please try again.`);
    setIsLoading(false);
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
      <CardBody className="flex flex-col text-center py-10">
        <p className="text-lg">
          Thanks for using{" "}
          <span className="font-bold">
            <br />
            <Logo className="inline" />
          </span>
          !
        </p>
        <Spacer />
        <p className="text-default-500">Let&apos;s get your device set up</p>
      </CardBody>
      {isLoading && <Progress className="h-1 -mb-1" isIndeterminate />}
      {error && (
        <div className="py-2 text-center text-danger-500 text-sm bg-danger-50">
          {error}
        </div>
      )}
      <CardFooter>
        <div className="flex-grow"></div>
        <Button isDisabled={isLoading} onClick={onNextPage} color="primary">
          Next
        </Button>
      </CardFooter>
    </>
  );
}

export default Page1;
