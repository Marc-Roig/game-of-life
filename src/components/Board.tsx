import Cell from "./Cell";
import { Board as BoardType, Cell as CellType } from "../hooks/useGame";

interface BoardProps {
  board: BoardType;
  toggleCell: (cell: CellType) => void;
}

const Board = ({ board, toggleCell }: BoardProps) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 20px)`,
      }}
    >
      {board.map((rows, i) =>
        rows.map((cell, j) => (
          <Cell
            cell={cell}
            dragged={false}
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
