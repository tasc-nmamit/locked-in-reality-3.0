"use client";

import { useState, useEffect, FC } from "react";

interface SlidingImagePuzzleProps {
  imageUrl: string;
  width?: number;
  height?: number;
}

const SlidingImagePuzzle: FC<SlidingImagePuzzleProps> = ({
  imageUrl,
  width = 400,
  height = 400,
}) => {
  const tileCount = 25;
  const gridSize = 5;
  const tileSize = width / gridSize;

  // Solved board: pieces 0 to 14 with the last one (index 15) empty (null)
  const solvedBoard: (number | null)[] = Array.from(
    { length: tileCount - 1 },
    (_, i) => i,
  ).concat(null as unknown as ConcatArray<number>);

  // The board state holds the current order of pieces.
  const [board, setBoard] = useState<(number | null)[]>(solvedBoard);
  // Flag to indicate that the board has been shuffled at least once.
  const [isShuffled, setIsShuffled] = useState(false);

  // Shuffle the board by performing a series of legal moves from the solved state.
  const shuffleBoard = () => {
    const newBoard = [...solvedBoard];
    let emptyIndex = newBoard.indexOf(null);
    const moves = [-1, 1, -gridSize, gridSize]; // left, right, up, down

    // Perform many random moves to guarantee a solvable puzzle.
    for (let i = 0; i < 1000; i++) {
      const possibleMoves: number[] = [];
      moves.forEach((move) => {
        const neighbor = emptyIndex + move;
        // Check boundaries
        if (neighbor >= 0 && neighbor < tileCount) {
          // For left/right moves, ensure same row.
          if (
            (move === -1 || move === 1) &&
            Math.floor(emptyIndex / gridSize) !==
              Math.floor(neighbor / gridSize)
          ) {
            return;
          }
          possibleMoves.push(neighbor);
        }
      });
      if (possibleMoves.length > 0) {
        const randomNeighbor =
          possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        if (emptyIndex !== undefined && randomNeighbor !== undefined) {
          [newBoard[emptyIndex], newBoard[randomNeighbor]] = [
            newBoard[randomNeighbor]!,
            newBoard[emptyIndex]!,
          ];
        }
        if (randomNeighbor !== undefined) {
          emptyIndex = randomNeighbor;
        }
      }
    }
    setBoard(newBoard);
    setIsShuffled(true);
  };

  // Shuffle once when the component mounts.
  useEffect(() => {
    shuffleBoard();
  }, []);

  // Check if the puzzle is solved after every board update.
  useEffect(() => {
    const isSolved = board.every((tile, i) => tile === solvedBoard[i]);
    if (isShuffled && isSolved) {
      // toast.success("Puzzle solved!");
    }
  }, [board, solvedBoard, isShuffled]);

  // Handle clicking on a tile: if it's adjacent to the empty spot, swap them.
  const handleTileClick = (index: number) => {
    const emptyIndex = board.indexOf(null);
    const row1 = Math.floor(index / gridSize);
    const col1 = index % gridSize;
    const row2 = Math.floor(emptyIndex / gridSize);
    const col2 = emptyIndex % gridSize;

    if (
      (row1 === row2 && Math.abs(col1 - col2) === 1) ||
      (col1 === col2 && Math.abs(row1 - row2) === 1)
    ) {
      const newBoard = [...board];
      if (newBoard[index] !== undefined && newBoard[emptyIndex] !== undefined) {
        [newBoard[index], newBoard[emptyIndex]] = [
          newBoard[emptyIndex],
          newBoard[index],
        ];
      }
      setBoard(newBoard);
    }
  };

  return (
    <div
      className="border-2 border-black"
      style={{
        width: width,
        height: height,
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${tileSize}px)`,
      }}
    >
      {board.map((tile, index) => {
        // Calculate the background position based on the original tile number.
        let backgroundPosition = "none";
        if (tile !== null) {
          const originalRow = Math.floor(tile / gridSize);
          const originalCol = tile % gridSize;
          backgroundPosition = `-${originalCol * tileSize}px -${originalRow * tileSize}px`;
        }
        return (
          <div
            key={index}
            onClick={() => handleTileClick(index)}
            className="relative box-border border border-gray-300"
            style={{
              width: tileSize,
              height: tileSize,
              backgroundImage: tile !== null ? `url(${imageUrl})` : "none",
              backgroundSize: `${width}px ${height}px`,
              backgroundPosition,
              cursor: tile !== null ? "pointer" : "default",
            }}
          >
            {tile !== null && (
              <div className="absolute right-0 top-0 m-1 rounded-full bg-black bg-opacity-50 px-1 text-xs text-white">
                {tile + 1}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SlidingImagePuzzle imageUrl="/feaky.png" width={400} height={400} />
    </div>
  );
}
