import { useEffect } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import Board from "../common/components/Board/Board";

function App() {
  useEffect(() => {
    document.title = "Button Board - Client";
  }, []);

  return (
    <div className={styles.container}>
      <Nav />
      <Board />
    </div>
  );
}

export default App;
