import Button from "./Button/Button";
import ImageFrame from "./ImageFrame/ImageFrame";
import Knob from "./Knob/Knob";
import Label from "./Label/Label";
import Scroll from "./Scroll/Scroll";
import Slider from "./Slider/Slider";
import Test from "./Test/Test";

/** Returns the wrapping div required for react-grid-layout and the selected widget component */
export default function createWidget(description) {
  const { id, type, layout } = description;

  let widget;

  switch (type) {
    case "button":
      widget = <Button description={description} />;
      break;

    case "toggle":
      widget = <Button description={description} type={"toggle"} />;
      break;

    case "label":
      widget = <Label description={description} />;
      break;

    case "v-scroll":
      widget = <Scroll description={description} orientation={"vertical"} />;
      break;

    case "h-scroll":
      widget = <Scroll description={description} orientation={"horizontal"} />;
      break;

    case "free-knob":
      widget = <Knob description={description} type={"free"} />;
      break;

    case "fixed-knob":
      widget = <Knob description={description} type={"fixed"} />;
      break;

    case "v-slider":
      widget = <Slider description={description} orientation={"vertical"} />;
      break;

    case "h-slider":
      widget = <Slider description={description} orientation={"horizontal"} />;
      break;

    case "test":
      widget = <Test description={description} />;
      break;

    case "image-frame":
      widget = <ImageFrame description={description} />;
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
