import { Button, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

function Page3({ setPage, deviceInfo, setDeviceInfo }) {
  function onNextPage() {}

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left">
        <p className="text-lg">Title</p>
        <p className="text-default-500 text-sm">Subtext</p>
      </CardBody>
      <CardFooter>
        <Button onClick={() => setPage((page) => page - 1)} variant="light">
          Back
        </Button>
        <div className="flex-grow"></div>
        <Button onClick={onNextPage} color="primary">
          Next
        </Button>
      </CardFooter>
    </>
  );
}

export default Page3;
