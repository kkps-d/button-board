import WidgetBase from "./WidgetBase/WidgetBase";

/** Returns the wrapping div required for react-grid-layout and the selected widget component */
export default function createWidget(description) {
  const { id, type, layout } = description;

  let widget;

  return (
    <div key={id} data-grid={{ ...layout, i: id }}>
      <WidgetBase></WidgetBase>
    </div>
  );
}
