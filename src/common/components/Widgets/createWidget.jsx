import Button from "./Button/Button";
import ImageFrame from "./ImageFrame/ImageFrame";
import Knob from "./Knob/Knob";
import Label from "./Label/Label";
import Scroll from "./Scroll/Scroll";
import Slider from "./Slider/Slider";
import Test from "./Test/Test";

/** Returns the wrapping div required for react-grid-layout and the selected widget component */
export default function createWidget(description, gridSize) {
  const { id, type, layout } = description;

  let widget;

  switch (type) {
    case "button":
      widget = <Button gridSize={gridSize} description={description} />;
      break;

    case "toggle":
      widget = (
        <Button gridSize={gridSize} description={description} type={"toggle"} />
      );
      break;

    case "label":
      widget = <Label gridSize={gridSize} description={description} />;
      break;

    case "v-scroll":
      widget = (
        <Scroll
          gridSize={gridSize}
          description={description}
          orientation={"vertical"}
        />
      );
      break;

    case "h-scroll":
      widget = (
        <Scroll
          gridSize={gridSize}
          description={description}
          orientation={"horizontal"}
        />
      );
      break;

    case "free-knob":
      widget = (
        <Knob gridSize={gridSize} description={description} type={"free"} />
      );
      break;

    case "fixed-knob":
      widget = (
        <Knob gridSize={gridSize} description={description} type={"fixed"} />
      );
      break;

    case "v-slider":
      widget = (
        <Slider
          gridSize={gridSize}
          description={description}
          orientation={"vertical"}
        />
      );
      break;

    case "h-slider":
      widget = (
        <Slider
          gridSize={gridSize}
          description={description}
          orientation={"horizontal"}
        />
      );
      break;

    case "test":
      widget = <Test gridSize={gridSize} description={description} />;
      break;

    case "image-frame":
      widget = <ImageFrame gridSize={gridSize} description={description} />;
      break;

    default:
      widget = (
        <Label
          description={{
            ...description,
            state: {
              label: `Unknown type\n'${type}'`,
            },
          }}
        />
      );
      break;
  }

  return (
    <div key={id} data-grid={{ ...layout, i: id }}>
      {widget}
    </div>
  );
}
