"use client";
import React, { useState } from "react";
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
import LaughingCat from "../trolls/laughing-cat";

export default function RepoSearch({ trollUser }: { trollUser: boolean }) {
  const [trolled, setTrolled] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  function handleSubmit() {
    if (
      code.trim().toLowerCase() === "Omae Wa Mou Shindeiru".trim().toLowerCase()
    ) {
      if (trollUser) {
        toast.success("Correct answer. But wrong QR.");
        setTrolled(true);
      } else {
        // TODO: call api for submitting
      }
    } else {
      toast.error("Incorrect answer. Try again.");
    }
  }

  function handleUseHint() {
    if (trollUser) {
      // TODO: call api for using hint (wrong qr)
      setHintUsed(true);
    } else {
      // TODO: call api for using hint
      setHintUsed(true);
    }
    setOpen(false);
  }

  if (trolled) {
    return <LaughingCat />;
  }

  return (
    <div className="max-w-3xl rounded-lg bg-background p-6">
      <h1 className="text-center text-lg font-semibold">
        People call me issue because I live with bugs. You can search me from
        where you search most of your other stuffs. Ultimately I have what you
        want.
      </h1>
      {hintUsed && (
        <p className="mt-6 text-center opacity-80">
          Hint: Parents name is tasc-nmamit. Ask her children whether they have
          what you want.
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
