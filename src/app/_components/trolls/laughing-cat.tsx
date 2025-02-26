"use client";
import Link from "next/link";
import React from "react";

export default function LaughingCat() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-background p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold">You have been trolled!</h1>
      <video src="/troll/laughing-cat.mp4" autoPlay controls={false} loop />
      <Link href={"/"} className="underline">
        Go home
      </Link>
    </div>
  );
}
