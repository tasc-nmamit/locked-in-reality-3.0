"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
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
import RickAshley from "../trolls/rick-ashley";

const THRESHOLD = 5;

type Response = {
  status: string;
  message: string;
  hint: string | null;
  code: number | null;
  location: string;
};

export default function ColorMatcher({
  trollUser,
  puzzle,
}: {
  trollUser: boolean;
  puzzle: string;
}) {
  const [open, setOpen] = useState(false);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [trolled, setTrolled] = useState(false);
  const [result, setResult] = useState<Response | null>(null);

  const [targetColor, setTargetColor] = useState({
    red: 255,
    green: 255,
    blue: 255,
  });

  const hintMutation = api.round2.takeHint.useMutation();
  const submitMutation = api.round2.updateProgress.useMutation();

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
      void handleSubmit();
    }
  }, [red, green, blue]);

  async function handleUseHint() {
    if (!trollUser) {
      // TODO: api for hint
      const res = await hintMutation.mutateAsync(puzzle);
      if (res.status === "ERROR") {
        toast.error(res.message);
        return;
      }
    }
    setHintUsed(true);
    setOpen(false);
  }

  async function handleSubmit() {
    if (trollUser) {
      // TODO: show troll page
      setTrolled(true);
    }

    if (
      isWithinThreshold(red, targetColor.red) &&
      isWithinThreshold(green, targetColor.green) &&
      isWithinThreshold(blue, targetColor.blue)
    ) {
      // TODO: api for submission
      const res = await submitMutation.mutateAsync(puzzle);
      if (res.status === "ERROR") {
        toast.error(res.message);
        return;
      }
      setResult(res);
      console.log("Matched within threshold");
      toast.success("Matched within threshold");
    }
  }

  if (trolled) {
    return <RickAshley />;
  }

  if (!result) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-transparent p-4">
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
                  className={`w-full ${isWithinThreshold(red, targetColor.red) ? "border-green-600" : ""}`}
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
                  className={`w-full ${isWithinThreshold(green, targetColor.green) ? "border-green-600" : ""}`}
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
                  className={`w-full ${isWithinThreshold(blue, targetColor.blue) ? "border-green-600 focus:ring-green-600" : ""}`}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="mt-4 flex justify-center gap-2">
                <Button
                  onClick={async () => {
                    await handleSubmit();
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
                        onClick={async () => {
                          await handleUseHint();
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

  return (
    <div className="rounded-lg bg-purple-500/30 p-2 text-white backdrop-blur-sm">
      <p>Clue: {result.hint}</p>
      <p>Code: {result.code}</p>
    </div>
  );
}
