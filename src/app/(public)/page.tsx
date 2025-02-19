"use client";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "~/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="pt-80">
      <div className="h-fit bg-gradient-to-b from-purple-800 via-purple-300 to-purple-900 bg-clip-text">
        <header className="text-center font-rosca md:text-8xl text-6xl font-bold text-transparent">
          Locked In <br /> Reality 3.0
        </header>
      </div>
      <div>
        <p className="mx-auto my-6 max-w-xl text-center md:text-xl text-sm font-medium text-white">
          Dive into world of mystery and adventure. Performe well and prove your
          might among the best.
        </p>
      </div>
      <div className="mt-10 flex w-full justify-center gap-4">
        <Button
          onClick={() => router.push("/rules")}
          className="rounded-full border-2 border-white/20 bg-gradient-to-r from-slate-950 to-slate-800 md:p-8 p-6 md:text-2xl text-xl transition-all duration-300 hover:scale-110"
        >
          Rules
        </Button>
        <Button
          onClick={() => router.push("/start")}
          className="rounded-full border-2 border-white/20 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-600 md:p-8 p-6 md:pr-5 pr-3 md:text-2xl text-xl transition-all duration-300 hover:scale-110"
        >
          Start
          <FaArrowRight className="md:ml-2 ml-0 md:size-10 size-6 animate-pulse" />
        </Button>
      </div>
    </main>
  );
}
