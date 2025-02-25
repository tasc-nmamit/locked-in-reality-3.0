"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function RandomNumber() {
  const [number, setNumber] = useState(
    Math.min(Math.floor(Math.random() * 100) + 1, 100),
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [gameCompleted, setGameCompleted] = useState(false);
  const [trolled, setTrolled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 || gameCompleted) {
      setTrolled(true);
    }
  }, [timeLeft, gameCompleted]);

  const handleGuess = () => {
    const guessNumber = parseInt(guess, 10);
    if (guessNumber === number) {
      toast.message(
        "Yeah! you have guess the corrent number. Yet you are trolled LOL",
      );
      setGameCompleted(true);
    } else if (guessNumber < number) {
      toast.warning("Too low!");
    } else {
      toast.warning("Too high!");
    }
  };

  return (
    <>
      {!trolled ? (
        <div className="flex flex-col gap-4 px-4 text-center">
          <h1 className="mb-4 text-2xl font-bold">Guess Me!</h1>
          <p>
            Number is already generated. Guess that number between 1 to 100. You
            can go to home page{" "}
            <Link href={"/"} className="underline">
              here
            </Link>
          </p>
          <div className="flex flex-row">
            <Input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={timeLeft === 0}
            />
            <Button onClick={handleGuess} disabled={timeLeft === 0}>
              Guess
            </Button>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-center">
          <h1 className="mb-4 text-2xl font-bold">You have been trolled!</h1>
          <video src="/troll/rick-ashley.mp4" autoPlay controls={false} loop />
          <Link href={"/"} className="underline">
            Go home
          </Link>
        </div>
      )}
    </>
  );
}
