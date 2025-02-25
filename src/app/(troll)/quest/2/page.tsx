import React from "react";
import RandomNumber from "~/app/_components/trolls/random-number";

export default function TrollGame() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <RandomNumber />
    </div>
  );
}
