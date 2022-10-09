import { useState } from "react";
import "./App.css";
import { Board as BoardType, useGame } from "./hooks/useGame";
import useInterval from "./hooks/useInterval";
import Board from "./components/Board";
import PresetLoader from "./components/PresetLoader";

function App() {
  const [initBoard, setInitBoard] = useState<BoardType>(null);
  const [gameSpeed, setGameSpeed] = useState<number | null>(null);
  const { board, tick, toggleCell, reset } = useGame({
    rows: 20,
    cols: 50,
    initBoard,
  });

  useInterval(() => tick(board), gameSpeed);

  if (!board.length) {
    return null;
  }

  return (
    <div>
      <h1>GAME OF LIFE</h1>
      {/* Board */}
      <Board board={board} toggleCell={toggleCell} />
      {/* Controls */}
      <div className="controls">
        <div className="controls-row">
          <button onClick={() => setGameSpeed(100)}>Play</button>
          <button onClick={() => setGameSpeed(null)}>Pause</button>
          <button onClick={reset}>Reset</button>
        </div>
        <div className="controls-row">
          <PresetLoader
            handleSelect={(board: BoardType) => setInitBoard(board)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
