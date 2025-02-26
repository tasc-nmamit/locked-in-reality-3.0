"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";

export default function Round1Dialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const appSettings = api.settings.getSettings.useQuery();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appSettings.data?.round1Start) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const time = appSettings.data.round1Start.toString();

      interval = setInterval(() => {
        const timeElapsed = Math.floor(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          (Date.now() - new Date(time).getTime()) / 1000,
        );

        if (timeElapsed >= 10) {
          const isInStorage = window.localStorage.getItem("round1Dialog");
          if (!isInStorage) {
            setOpen(true);
            window.localStorage.setItem("round1Dialog", "true");
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [appSettings.data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle className="text-center font-rosca text-7xl text-destructive">
            Warning
          </DialogTitle>
          <DialogDescription className="pt-6 text-center text-lg text-black">
            Zorath has awaken into reality. Time to stop him and take him down
            once and for all.
          </DialogDescription>
          <Button
            className="mt-4"
            onClick={() => {
              router.push("/");
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
