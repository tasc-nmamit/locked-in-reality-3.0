"use client";
import React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Admin() {
  const appSettingsMutation = api.settings.startRound1.useMutation({
    onSuccess: () => {
      toast.success("Round 1 has started");
    },
    onError: () => {
      toast.error("Failed to start Round 1");
    },
  });
  const registerTeamMutation = api.auth.addTeam.useMutation({
    onSuccess(data, variables, context) {
      if (data) {
        toast.success("added: " + data.email + " " + data.name);
      }
    },
  });
  const [value, setValue] = React.useState("");

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 pt-40">
      <div>
        <Button
          variant={"secondary"}
          onClick={() => {
            appSettingsMutation.mutate();
          }}
        >
          Start Round 1
        </Button>
      </div>
      <Card className="mt-4 h-fit w-full max-w-3xl p-4">
        <CardHeader>
          <CardTitle>Enter Team</CardTitle>
          <CardDescription>
            <Input
              placeholder="team name"
              value={value}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value) {
                  setValue(target.value);
                }
              }}
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => {
              registerTeamMutation.mutate(value);
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
