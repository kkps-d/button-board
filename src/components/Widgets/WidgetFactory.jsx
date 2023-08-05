import BaseWidget from "./BaseWidget";
import Button from "./Button/Button";

/** Returns the wrapping div required for react-grid-layout and the Widget component */
export default function widgetFactory(widgetDescription) {
  const { id, type, layout } = widgetDescription;

  var widget;

  switch (type) {
    case "button":
      widget = <Button widget={widgetDescription} />;
      break;

    default:
      widget = <BaseWidget widget={widgetDescription} />;
      break;
  }

  return (
    <div key={id} data-grid={{ ...layout, i: id }}>
      {widget}
    </div>
  );
}
