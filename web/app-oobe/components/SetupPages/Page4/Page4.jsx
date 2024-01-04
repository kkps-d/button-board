import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Radio,
  RadioGroup,
  Tooltip,
} from "@nextui-org/react";
import StandaloneTooltip from "../../StandaloneTooltip/StandaloneTooltip";
import { useEffect, useState } from "react";
import calculateBoardDimensions from "../../../../common/utilities/calculateBoardDimensions";

const SIDEBAR_WIDTH = 90;

function Page4({ setPage, deviceInfo, setDeviceInfo }) {
  const [gridSize, setGridSize] = useState("large");
  const [displayMode, setDisplayMode] = useState("fullscreen");
  const [dimensions, setDimensions] = useState({ rows: 1, cols: 1 });
  const [resolution, setResolution] = useState({ w: 0, h: 0 });

  useEffect(() => {
    let resolution = {};
    function setResolutionAndDimensions(width, height) {
      resolution = {
        w: width - SIDEBAR_WIDTH,
        h: height,
      };

      setResolution(resolution);
      setDimensions(
        calculateBoardDimensions(resolution.w, resolution.h, gridSize)
      );
    }

    function onResize() {
      setResolutionAndDimensions(window.innerWidth, window.innerHeight);
      console.log("resize");
    }

    if (displayMode === "fullscreen") {
      // Calculate dimensions according to screen size
      setResolutionAndDimensions(window.screen.width, window.screen.height);
    } else {
      // Calculate dimensions to viewport width
      onResize();
      window.addEventListener("resize", onResize);
    }

    return () => window.removeEventListener("resize", onResize);
  }, [displayMode, gridSize]);

  function onNextPage() {
    setDeviceInfo((info) => ({
      ...info,
      defaultGridSize: gridSize,
      defaultDisplayMode: displayMode,
      resolution,
      recommendedDimensions: dimensions,
    }));
    setPage((page) => page + 1);
  }

  return (
    <>
      <CardHeader className="text-sm uppercase font-bold text-default-400">
        Set up your device
      </CardHeader>
      <CardBody className="flex flex-col text-left gap-2">
        <p className="text-lg">Default grid size</p>
        <RadioGroup
          aria-label="Default grid size"
          orientation="horizontal"
          value={gridSize}
          onChange={(e) => setGridSize(e.target.value)}
        >
          <Radio value="small">Small</Radio>
          <Radio value="medium">Medium</Radio>
          <Radio value="large">Large</Radio>
        </RadioGroup>
        <p className="text-default-500 text-sm">
          This can be changed this later for each board
        </p>
        <p className="text-lg">
          Display mode{" "}
          <StandaloneTooltip content="Select 'Fullscreen' if you plan to use only button board on your device. This will give you the most board space. Select 'Windowed' if you plan to use button board alongside other apps on your device (etc. split-screen). Make sure you put the browser in the window configuration you intend to use to get the best measurement of board space." />
        </p>
        <RadioGroup
          value={displayMode}
          onChange={(e) => setDisplayMode(e.target.value)}
          aria-label="Default grid size"
          orientation="horizontal"
        >
          <Radio value="fullscreen">Fullscreen</Radio>
          <Radio value="windowed">Windowed</Radio>
        </RadioGroup>
        <p className="text-lg">Default board dimensions</p>
        <p className="text-default-500 text-sm">
          Adjusted available resolution -{" "}
          <b>
            <span>{resolution.w}</span> x <span>{resolution.h}</span>
          </b>
        </p>
        <div className="flex flex-row gap-2">
          <Input
            min={1}
            value={dimensions.rows}
            onInput={(value) =>
              setDimensions((dimensions) => ({ ...dimensions, rows: value }))
            }
            label="Rows"
            type="number"
          />
          <Input
            min={1}
            value={dimensions.cols}
            onInput={(value) =>
              setDimensions((dimensions) => ({ ...dimensions, cols: value }))
            }
            label="Cols"
            type="number"
          />
        </div>
        <p className="text-default-500 text-sm">
          Your display size is being measured and the recommended dimensions are
          being calculated
        </p>
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

export default Page4;
