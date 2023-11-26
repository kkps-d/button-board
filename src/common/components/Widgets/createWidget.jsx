import Button from "./Button/Button";
import Label from "./Label/Label";

/** Returns the wrapping div required for react-grid-layout and the selected widget component */
export default function createWidget(description) {
  const { id, type, layout } = description;

  let widget;

  switch (type) {
    case "button":
      widget = <Button description={description} />;
      break;

    case "label":
      widget = <Label description={description} />;
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
