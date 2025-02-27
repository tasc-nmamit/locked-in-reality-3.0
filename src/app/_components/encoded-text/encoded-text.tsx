"use client";
import React, { useState } from "react";
import Image from "next/image";
import OiiaOiia from "../trolls/oiia-oiia";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
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

type Response = {
  status: string;
  message: string;
  hint: string | null;
  code: number | null;
  location: string;
};

export default function EncodedText({
  trollUser,
  puzzle,
}: {
  trollUser: boolean;
  puzzle: string;
}) {
  const [trolled, setTrolled] = useState(false);
  const [decodedText, setDecodedText] = useState("");
  const [open, setOpen] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [result, setResult] = useState<Response | null>(null);

  const hintMutation = api.round2.takeHint.useMutation();
  const submitMutation = api.round2.updateProgress.useMutation();

  async function handleUseHint() {
    if (!trollUser) {
      // TODO: call api for using hint
      const res = await hintMutation.mutateAsync(puzzle);
      if (res.status === "ERROR") {
        toast.error(res.message);
        return;
      }
    }
    setHintUsed(true);
    setOpen(false);
  }

  async function handleSumit() {
    if (decodedText.toLowerCase() === "intelligence") {
      if (trollUser) {
        setTrolled(true);
      } else {
        // TODO: call api for submitting
        const res = await submitMutation.mutateAsync(puzzle);
        if (res.status === "ERROR") {
          toast.error(res.message);
          return;
        }
        setResult(res);
      }
    } else {
      toast.error("Incorrect answer. Try again.");
    }
  }

  if (trolled) {
    return <OiiaOiia />;
  }

  if (!result) {
    return (
      <div className="rounded-lg bg-background p-6">
        <Image
          src="/encoded-text.jpg"
          alt="intelligence"
          height={500}
          width={500}
        />
        <div>
          {hintUsed && (
            <p className="mb-4 text-center opacity-80">
              Hint: Elder Futhark runes, Reverse
            </p>
          )}
          <Input
            placeholder="Enter decoded text here."
            value={decodedText}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target) {
                setDecodedText(target.value);
              }
            }}
          />
          <div className="mt-4 flex flex-row gap-4">
            <Button onClick={() => handleSumit()}>Submit</Button>
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
    );
  }

  return (
    <div className="rounded-lg bg-purple-500/30 p-2 text-white backdrop-blur-sm">
      <p>Clue: {result.hint}</p>
      <p>Code: {result.code}</p>
    </div>
  );
}
