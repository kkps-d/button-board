import { useRef } from "react";
import { useBoard } from "../../contexts/BoardContext/BoardContext";
import styles from "./DebugPanel.module.css";

function DebugPanel() {
  const {
    editMode,
    boards,
    selectedBoardIndex,
    setEditMode,
    addWidget,
    deleteWidget,
    setDimensions,
  } = useBoard();

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const { name, descriptions, rows, cols, gridSize } =
    boards[selectedBoardIndex];

  const rowsRef = useRef(null);
  const colsRef = useRef(null);

  const widgetTypes = ["label", "button", "invalid"];
  function onAddWidget(e) {
    if (e.target.value != "default") {
      switch (e.target.value) {
        case "label":
          addWidget({
            type: "label",
            layout: { x: 7, y: 5, w: 2, h: 1 },
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

  function onChangeDimensions(e) {
    const rows = rowsRef.current.value;
    const cols = colsRef.current.value;
    setDimensions(rows, cols);
  }

  return (
    <div className={styles.debugPanel}>
      <label>
        Board: <b>{name}</b>
      </label>
      <button onClick={toggleEditMode}>
        Edit: <b>{`${editMode}`}</b>
      </button>
      <select onChange={onAddWidget}>
        <option value={"default"}>Add widget</option>
        {widgetTypes.map((widget) => (
          <option key={widget} value={widget}>
            {widget}
          </option>
        ))}
      </select>
      <select className={styles.deleteSelect} onChange={onDeleteWidget}>
        <option value={-1}>
          Remove from {Object.keys(descriptions).length} widgets
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
      <label>Grid size</label>
      <select value={gridSize}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <label>Rows</label>
      <input
        ref={rowsRef}
        onInput={onChangeDimensions}
        className={styles.numInput}
        type="number"
        value={rows}
      />
      <label>Cols</label>
      <input
        ref={colsRef}
        onInput={onChangeDimensions}
        className={styles.numInput}
        type="number"
        value={cols}
      />
    </div>
  );
}

export default DebugPanel;
