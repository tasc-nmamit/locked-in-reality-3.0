"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

// const WORDS = ["apple", "grape", "peach", "berry", "mango"];
const MAX_ATTEMPTS = 10;
const word = "troll";

export default function WordleGame() {
  //   const [word, setWord] = useState("troll");
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [isTrolled, setIsTrolled] = useState(false);

  const handleGuess = () => {
    if (guess.length !== word.length) {
      //   setMessage(`Guess must be ${word.length} letters long.`);
      toast.warning(`Guess must be ${word.length} letters long.`);
      return;
    }

    const newAttempts = [...attempts, guess];
    setAttempts(newAttempts);

    if (guess === word) {
      //   setMessage("Congratulations! You guessed the word!");
      toast.success(
        "Congratulations! You guessed the correct word and got trolled LOL!",
      );
      setGameOver(true);
      setIsTrolled(true);
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      //   setMessage(`Game over! The word was ${word}.`);
      toast.error(`Game over! Try again.`);
      setGameOver(true);
    } else {
      //   setMessage("Try again!");
      toast.error("Wrong word! Try again!");
    }

    setGuess("");
  };

  if (isTrolled) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">You have been trolled!</h1>
        <video src="/troll/oiia-oiia.mp4" autoPlay controls={false} loop />
        <Link href={"/"} className="underline">
          Go home
        </Link>
      </div>
    );
  } else
    return (
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">Wordle</h1>
        <p>Guess the 5-letter word</p>
        <div className="flex flex-col items-center gap-4">
          <Input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
            maxLength={word.length}
          />
          <Button onClick={handleGuess} disabled={gameOver}>
            Submit
          </Button>
          <p>{message}</p>
          <div className="flex flex-col gap-2">
            {attempts.map((attempt, index) => (
              <div key={index} className="grid grid-cols-5 gap-2">
                {attempt.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`border p-2 ${
                      char === word[i]
                        ? "bg-green-500"
                        : word.includes(char)
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
