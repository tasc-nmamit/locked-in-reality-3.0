"use client";
import React, { useState } from "react";
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
import LaughingCat from "../trolls/laughing-cat";

type Response = {
  status: string;
  message: string;
  hint: string | null;
  code: number | null;
  location: string;
};

export default function RepoSearch({
  trollUser,
  puzzle,
}: {
  trollUser: boolean;
  puzzle: string;
}) {
  const [trolled, setTrolled] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Response | null>(null);

  const hintMutation = api.round2.takeHint.useMutation();
  const submitMutation = api.round2.updateProgress.useMutation();

  async function handleSubmit() {
    if (
      code.trim().toLowerCase() === "Omae Wa Mou Shindeiru".trim().toLowerCase()
    ) {
      if (trollUser) {
        toast.success("Correct answer. But wrong QR.");
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

  async function handleUseHint() {
    if (trollUser) {
      // TODO: call api for using hint (wrong qr)
      const res = await hintMutation.mutateAsync(puzzle);
      if (res.status === "ERROR") {
        toast.error(res.message);
        return;
      }
      setHintUsed(true);
    } else {
      // TODO: call api for using hint
      const res = await hintMutation.mutateAsync(puzzle);
      if (res.status === "ERROR") {
        toast.error(res.message);
        return;
      }
      setHintUsed(true);
    }
    setOpen(false);
  }

  if (trolled) {
    return <LaughingCat />;
  }

  if (!result) {
    return (
      <div className="max-w-3xl rounded-lg bg-background p-6">
        <h1 className="text-center text-lg font-semibold">
          People call me issue because I live with bugs. You can search me from
          where you search most of your other stuffs. Ultimately I have what you
          want.
        </h1>
        {hintUsed && (
          <p className="mt-6 text-center opacity-80">
            Hint: Parents name is tasc-nmamit. Ask her children whether they
            have what you want.
          </p>
        )}
        <div className="mt-4">
          <Input
            value={code}
            placeholder="Enter code here"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target) {
                setCode(target.value);
              }
            }}
          />
          <div>
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
