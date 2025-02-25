"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const TOTAL_CLICKS = 100;

export default function Clicks() {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [clickCount, setClickCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [trolled, setTrolled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 || gameCompleted) {
      setTrolled(true);
    }
  }, [timeLeft, gameCompleted]);

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    if (clickCount + 1 >= TOTAL_CLICKS) {
      setGameCompleted(true);
    }
  };

  return (
    <>
      {!trolled ? (
        <div className="px-4 text-center">
          <h1 className="mb-4 text-2xl font-bold">Click me!</h1>
          <p className="max-w-md">
            Complete the clicks to get the next clue. You can go to home page{" "}
            <Link href={"/"} className="underline">
              here
            </Link>
          </p>
          <p className="my-2 text-lg">
            Clicks: {clickCount}/{TOTAL_CLICKS}
          </p>
          <div className="flex flex-row justify-center gap-6">
            <Button onClick={handleButtonClick}>Click Me!</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"outline"}>Hint</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    You will gain a hint at the cost of your score.
                  </DialogDescription>
                  <div className="flex flex-row justify-center gap-4">
                    <DialogClose asChild>
                      <Button variant={"destructive"}>No</Button>
                    </DialogClose>
                    <Button
                      onClick={() => {
                        setShowHint(true);
                        setOpen(false);
                      }}
                    >
                      Yes
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          {showHint && <p className="mt-4">Hint: Wrong puzzle LOL!</p>}
        </div>
      ) : (
        <div className="flex flex-col gap-4 text-center">
          <h1 className="mb-4 text-2xl font-bold">You have been trolled!</h1>
          <video src="/troll/laughing-cat.mp4" autoPlay controls={false} loop />
          <Link href={"/"} className="underline">
            Go home
          </Link>
        </div>
      )}
    </>
  );
}
