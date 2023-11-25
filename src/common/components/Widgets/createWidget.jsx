import Button from "./Button/Button";
import WidgetBase from "./WidgetBase/WidgetBase";

/** Returns the wrapping div required for react-grid-layout and the selected widget component */
export default function createWidget(description) {
  const { id, type, layout } = description;

  let widget;

  switch (type) {
    case "button":
      widget = <Button description={description} />;
      break;

    default:
      widget = <WidgetBase></WidgetBase>;
      break;
  }

  return (
    <div key={id} data-grid={{ ...layout, i: id }}>
      {widget}
    </div>
  );
}
