"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";

export default function SignOutPage() {
  return (
    <div className="flex w-full max-w-xl flex-col space-y-4 rounded-lg border-2 bg-background p-4 py-8">
      <h1 className="text-center text-2xl font-semibold">
        You can Logout here!
      </h1>
      <Button
        className="mx-auto w-full max-w-sm"
        onClick={async () => {
          await signOut({
            redirect: true,
            redirectTo: "/",
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
}
