"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { api } from "~/trpc/react";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const appSettingsQuery = api.settings.getSettings.useQuery();
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    return (
      <main className="flex h-[calc(100vh)] w-full items-center justify-center">
        <div>
          <div className="bg-gradient-to-b from-slate-600 via-slate-300 to-slate-700 bg-clip-text">
            <h1 className="w-full text-center text-5xl font-bold text-transparent md:text-7xl lg:text-9xl">
              Oops!
            </h1>
          </div>
          <p className="mt-4 text-center text-xs text-white/80 md:text-xl">
            You need to{" "}
            <Link
              href={`/auth/login?callbackUrl=/start`}
              className="text-blue-600 underline"
            >
              login
            </Link>{" "}
            to start your Quests
          </p>
        </div>
      </main>
    );
  }

  if (appSettingsQuery.isLoading) {
    return (
      <main className="flex h-[calc(100vh)] w-full items-center justify-center">
        <div>
          <div className="bg-gradient-to-b from-slate-600 via-slate-300 to-slate-700 bg-clip-text">
            <h1 className="w-full text-center text-lg font-bold text-transparent md:text-xl lg:text-2xl">
              Loading...
            </h1>
          </div>
        </div>
      </main>
    );
  }

  if (appSettingsQuery.error) {
    return (
      <main className="flex h-[calc(100vh)] w-full items-center justify-center">
        <div>
          <div className="bg-gradient-to-b from-red-900 via-red-500 to-red-800 bg-clip-text">
            <h1 className="w-full text-center text-5xl font-bold text-transparent md:text-7xl lg:text-9xl">
              Oops!
            </h1>
          </div>
          <p className="mt-4 text-center text-xs text-white/80 md:text-xl">
            Something went wrong. Go{" "}
            <Link href={`/`} className="text-blue-600 underline">
              Home
            </Link>
          </p>
        </div>
      </main>
    );
  }

  if (
    appSettingsQuery.data?.round1 === true ||
    appSettingsQuery.data?.round2 === true
  ) {
    return (
      <main className="flex h-[calc(100vh)] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold text-white md:text-5xl">
            <span className="text-purple-500">
              Round{" "}
              {(appSettingsQuery.data.round1 && "1") ||
                (appSettingsQuery.data.round2 && "2")}
            </span>{" "}
            has begun.
          </h1>
          <Button
            onClick={() => {
              if (appSettingsQuery.data?.round1) {
                router.push("/start/round1");
              } else if (appSettingsQuery.data?.round2) {
                router.push("/start/round2");
              }
            }}
            className="w-fit rounded-full border-2 border-white/50 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-600 px-4 py-6"
          >
            Start Round{" "}
            {(appSettingsQuery.data.round1 && "1") ||
              (appSettingsQuery.data.round2 && "2")}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-[calc(100vh)] w-full items-center justify-center">
      <div>
        <div className="bg-gradient-to-b from-slate-600 via-slate-300 to-slate-700 bg-clip-text">
          <h1 className="w-full text-center text-5xl font-bold text-transparent md:text-7xl lg:text-9xl">
            Whoa!
          </h1>
        </div>
        <p className="mt-4 text-center text-xs text-white/80 md:text-xl">
          The rounds are yet to start. Please wait or{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => {
              window.location.reload();
            }}
          >
            refresh
          </button>{" "}
          the page
        </p>
      </div>
    </main>
  );
}
