"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

export default function Auth() {
  const router = useRouter();

  return (
    <div className="w-full max-w-xl rounded-lg border-2 p-6 py-8 shadow-lg">
      <h1 className="text-center text-3xl font-semibold">Authentication</h1>
      <div className="mx-auto mt-8 flex max-w-sm flex-col space-y-2">
        <Button onClick={() => router.push("/auth/login")}>Login</Button>
        <Button disabled onClick={() => router.push("/auth/signup")}>
          Sign up
        </Button>
      </div>
    </div>
  );
}
