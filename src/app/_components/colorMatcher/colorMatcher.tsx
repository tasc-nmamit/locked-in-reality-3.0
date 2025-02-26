"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import { toast } from "sonner";

const THRESHOLD = 5;

export default function ColorMatcher() {
  const [open, setOpen] = useState(false);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [targetColor, setTargetColor] = useState({
    red: 255,
    green: 255,
    blue: 255,
  });

  useEffect(() => {
    const selected = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255),
    };
    setTargetColor(selected);

    console.log(selected);
  }, []);

  const isWithinThreshold = (value: number, target: number) => {
    return Math.abs(value - target) <= THRESHOLD;
  };

  useEffect(() => {
    if (
      isWithinThreshold(red, targetColor.red) &&
      isWithinThreshold(green, targetColor.green) &&
      isWithinThreshold(blue, targetColor.blue)
    ) {
      console.log("Matched within threshold");
    }
    if (
      red === targetColor.red &&
      green === targetColor.green &&
      blue === targetColor.blue
    ) {
      handleSubmit();
    }
  }, [red, green, blue]);

  function handleUseHint() {
    setHintUsed(true);
    setOpen(false);
  }

  function handleSubmit() {
    if (
      isWithinThreshold(red, targetColor.red) &&
      isWithinThreshold(green, targetColor.green) &&
      isWithinThreshold(blue, targetColor.blue)
    ) {
      console.log("Matched within threshold");
    }
    if (
      red === targetColor.red &&
      green === targetColor.green &&
      blue === targetColor.blue
    ) {
      console.log("Matched");
    } else {
      if (hintUsed) {
        const redMessage = isWithinThreshold(red, targetColor.red)
          ? "Red is high"
          : "Red is low";
        const greenMessage = isWithinThreshold(green, targetColor.green)
          ? "Green is high"
          : "Green is low";
        const blueMessage = isWithinThreshold(blue, targetColor.blue)
          ? "Blue is high"
          : "Blue is low";
        toast.message(`${redMessage}, ${greenMessage}, ${blueMessage}`);
      } else {
        toast.message("Not matched");
      }
    }
  }

  return (
    <div className="h-full w-full bg-transparent p-4">
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-background p-4">
        <div className="flex h-[40vh] w-full flex-col gap-2">
          <div
            className="flex size-40 w-full basis-1/2 items-center justify-center rounded-md"
            style={{
              backgroundColor: `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`,
            }}
          >
            <p
              className="w-full text-center"
              style={{
                color:
                  targetColor.red * 0.299 +
                    targetColor.green * 0.587 +
                    targetColor.blue * 0.114 >
                  186
                    ? "black"
                    : "white",
              }}
            >
              Target
            </p>
          </div>
          <div
            className="flex size-40 w-full basis-1/2 items-center justify-center rounded-md"
            style={{
              backgroundColor: `rgb(${red}, ${green}, ${blue})`,
            }}
          >
            <p
              className="w-full text-center"
              style={{
                color:
                  red * 0.299 + green * 0.587 + blue * 0.114 > 186
                    ? "black"
                    : "white",
              }}
            >
              Match me
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div>
            {hintUsed && (
              <p className="my-4 text-center opacity-80">
                Hint: your answer need not be the exact same. + or - 5
                difference is acceptable
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="red" className="w-16">
                Red:
              </label>
              <Input
                type="number"
                id="red"
                name="red"
                min="0"
                max="255"
                value={red}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    setRed(parseInt(target.value));
                  } else {
                    setRed(0);
                  }
                }}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="green" className="w-16">
                Green:
              </label>
              <Input
                type="number"
                id="green"
                name="green"
                min="0"
                max="255"
                value={green}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    setGreen(parseInt(target.value));
                  } else {
                    setGreen(0);
                  }
                }}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="blue" className="w-16">
                Blue:
              </label>
              <Input
                type="number"
                id="blue"
                name="blue"
                min="0"
                max="255"
                value={blue}
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    setBlue(parseInt(target.value));
                  } else {
                    setBlue(0);
                  }
                }}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mt-4 flex justify-center gap-2">
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant={"outline"} disabled={hintUsed}>
                    Hint
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will result in time
                      penalty.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() => {
                        handleUseHint();
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
