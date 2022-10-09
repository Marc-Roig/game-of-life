import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { Board as BoardType, Cell as CellType } from "../hooks/useGame";

interface BoardProps {
  board: BoardType;
  toggleCell: (cell: CellType) => void;
}

const Board = ({ board, toggleCell }: BoardProps) => {
  const [size, setSize] = useState(20);

  const updateBoardDimensions = () => {
    const cellSize = Math.floor((window.innerWidth * 0.8) / board[0].length);
    setSize(Math.min(cellSize, 20));
  };

  useEffect(() => {
    updateBoardDimensions();
    window.addEventListener("resize", updateBoardDimensions, false);
  }, []);

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, ${size}px)`,
      }}
    >
      {board.map((rows, i) =>
        rows.map((cell, j) => (
          <Cell
            cell={cell}
            size={size}
            handleCellClick={() => {
              toggleCell(cell);
            }}
            key={`${i}-${j}`}
          />
        ))
      )}
    </div>
  );
};

export default Board;
