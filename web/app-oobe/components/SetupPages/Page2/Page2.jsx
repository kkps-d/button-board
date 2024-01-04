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

function Page2({ setPage }) {
  const [option, setOption] = useState("select-existing");
  const [isLoading, setIsLoading] = useState(false);

  function onNextPage() {}

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left">
        <p className="text-lg">Another device has already been set up.</p>
        <Spacer />
        <RadioGroup
          value={option}
          onValueChange={setOption}
          label="Would you like to select an existing device, or register a new one?"
        >
          <Radio value="new-device">Register a new device</Radio>
          <Radio value="select-existing">Select an existing device</Radio>
        </RadioGroup>
        <Spacer />
        {option === "select-existing" && (
          <>
            <Spacer />
            <Select placeholder="Select a device">
              <SelectItem value="abcd">Device 1</SelectItem>
              <SelectItem value="def">Device 2</SelectItem>
            </Select>
          </>
        )}
      </CardBody>
      {isLoading && <Progress className="h-1 -mb-1" isIndeterminate />}
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

export default Page2;
