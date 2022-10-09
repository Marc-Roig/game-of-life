import React, { useCallback, useEffect, useState } from "react";

export interface Cell {
  x: number;
  y: number;
  isAlive: boolean;
  aliveFor: number;
}

export type Board = readonly Cell[][];

interface GameProps {
  rows: number;
  cols: number;
  initBoard?: Board;
}

const createBoard = ({ rows, cols }: { rows: number; cols: number }): Board =>
  Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      x: col,
      y: row,
      aliveFor: 0,
      // isAlive: false,
      isAlive: Math.random() > 0.8 ? true : false,
    }))
  );

const getNeighbours = (board: Board, cell: Cell): Cell[] => {
  const neighbours = [];

  const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  positions.forEach(([xOffset, yOffset]) => {
    const neighbourX = cell.x + xOffset;
    const neighbourY = cell.y + yOffset;

    if (
      neighbourX >= 0 &&
      neighbourX < board[0].length &&
      neighbourY >= 0 &&
      neighbourY < board.length
    ) {
      neighbours.push(board[neighbourY][neighbourX]);
    }
  });

  return neighbours;
};

export const useGame = ({ rows, cols, initBoard }: GameProps) => {
  const [board, setBoard] = useState<Board>([]);

  useEffect(() => {
    setBoard(initBoard || createBoard({ rows, cols }));
  }, [initBoard]);

  /* Toggles the cell's state */
  const toggleCell = (cell: Cell) => {
    const newBoard = board.map((row) =>
      row.map((c) => {
        if (c.x === cell.x && c.y === cell.y) {
          return { ...c, isAlive: !c.isAlive };
        }
        return c;
      })
    );
    console.log(newBoard);
    setBoard(newBoard);
  };

  /* Reset board */
  const reset = () => {
    setBoard(createBoard({ rows, cols }));
  };

  /* Update board */
  const tick = useCallback((board: Board) => {
    const newBoard = board.map((row) =>
      row.map((cell) => {
        const neighbors = getNeighbours(board, cell);
        const aliveNeighbors = neighbors.filter((n) => n.isAlive).length;
        if (cell.isAlive) {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            return {
              ...cell,
              isAlive: false,
              aliveFor: 0,
            };
          } else {
            return {
              ...cell,
              aliveFor: (cell.aliveFor || 0) + 1,
            };
          }
        } else {
          if (aliveNeighbors === 3) {
            return {
              ...cell,
              isAlive: true,
              aliveFor: 1,
            };
          }
        }

        return cell;
      })
    );
    setBoard(newBoard);
  }, []);

  return { board, tick, toggleCell, reset };
};
