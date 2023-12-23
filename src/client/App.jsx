import { useEffect } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import Board from "../common/components/Board/Board";
import DebugPanel from "../common/components/DebugPanel/DebugPanel";
import { BoardProvider } from "../common/contexts/BoardContext/BoardContext";

function App() {
  useEffect(() => {
    document.title = "Button Board - Client";
  }, []);

  return (
    <BoardProvider>
      <DebugPanel />
      <div className={styles.container}>
        <Nav />
        <Board />
      </div>
    </BoardProvider>
  );
}

export default App;
