import Board from "../components/Board/Board";

import Nav from "../components/Nav/Nav";
import { BoardProvider } from "../contexts/BoardContext";

function App() {
  return (
    <BoardProvider>
      <Nav />
      <Board />
    </BoardProvider>
  );
}

export default App;
