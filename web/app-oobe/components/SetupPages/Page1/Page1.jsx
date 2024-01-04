import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
} from "@nextui-org/react";
import Logo from "../../Logo/Logo";
import { useEffect, useState } from "react";
import getDevices from "../../../api/getDevices";

function Page1({ setPage }) {
  const [nextPage, setNextPage] = useState(1);
  const [devices, setDevices] = useState([]);

  getDevices(setDevices);
  useEffect(() => console.log(devices), devices);
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
      <CardFooter>
        <div className="flex-grow"></div>
        <Button onClick={() => setPage((page) => page + 1)} color="primary">
          Next
        </Button>
      </CardFooter>
    </>
  );
}

export default Page1;
