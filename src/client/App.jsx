import { useEffect } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import BoardContainer from "../common/components/Board/BoardContainer";

function App() {
  useEffect(() => {
    document.title = "Button Board - Client";
  }, []);

  return (
    <div className={styles.container}>
      <Nav />
      <BoardContainer />
    </div>
  );
}

export default App;
