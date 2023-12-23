import { useBoard } from "../../contexts/BoardContext/BoardContext";
import styles from "./DebugPanel.module.css";

function DebugPanel() {
  const { editMode, descriptions, setEditMode, addWidget, deleteWidget } =
    useBoard();

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const widgetTypes = ["label", "button", "invalid"];
  function onAddWidget(e) {
    if (e.target.value != "default") {
      switch (e.target.value) {
        case "label":
          addWidget({
            type: "label",
            layout: { x: 0, y: 1, w: 2, h: 1 },
            state: {
              label: "New lable",
              fontSize: "20",
              align: "right",
              showBorders: true,
            },
          });
          break;
        case "button":
          addWidget({
            type: "button",
            layout: { x: 0, y: 1, w: 1, h: 1 },
            state: {
              label: "Le button",
              fontSize: "fit",
            },
          });
          break;
        case "invalid":
          addWidget({
            type: "invalid",
            layout: { x: 0, y: 1, w: 1, h: 1 },
            state: {},
          });
          break;
        default:
          break;
      }
      e.target.value = "default";
    }
  }

  function onDeleteWidget(e) {
    if (e.target.value != -1) {
      deleteWidget(e.target.value);
    }
  }

  return (
    <div className={styles.debugPanel}>
      <button onClick={toggleEditMode}>
        Edit mode: <b>{`${editMode}`}</b>
      </button>
      <select onChange={onAddWidget}>
        <option value={"default"}>Add a widget...</option>
        {widgetTypes.map((widget) => (
          <option key={widget} value={widget}>
            {widget}
          </option>
        ))}
      </select>
      <select onChange={onDeleteWidget}>
        <option value={-1}>
          Remove from {Object.keys(descriptions).length} widgets...
        </option>
        {Object.entries(descriptions).map((entry) => {
          const [id, desc] = entry;
          const { type, state } = desc;
          return (
            <option key={id} value={id}>{`${id} ${type} ${JSON.stringify(
              state
            )}`}</option>
          );
        })}
      </select>
    </div>
  );
}

export default DebugPanel;
