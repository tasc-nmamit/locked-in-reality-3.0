import React from "react";
import WordleGame from "~/app/_components/trolls/WordleGame";

export default function TrollGame() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <WordleGame />
    </div>
  );
}
