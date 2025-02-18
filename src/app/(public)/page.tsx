"use client";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "~/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="pt-80">
      <div className="h-fit bg-gradient-to-b from-purple-800 via-purple-300 to-purple-900 bg-clip-text">
        <header className="font-rosca text-center text-8xl font-bold text-transparent">
          Locked In <br /> Reality 3.0
        </header>
      </div>
      <div>
        <p className="text-white mx-auto font-medium text-xl max-w-xl text-center my-6">
          Dive into world of mystery and adventure. Performe well and prove your might among the best.
        </p>
      </div>
      <div className="mt-10 flex w-full justify-center gap-4">
        <Button onClick={() => router.push("/rules")} className="rounded-full border-2 border-white/20 bg-gradient-to-r from-slate-950 to-slate-800 p-8 text-2xl hover:scale-110 transition-all duration-300">
          Rules
        </Button>
        <Button onClick={() => router.push("/start")} className="rounded-full border-2 border-white/20 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-600 p-8 pr-5 text-2xl hover:scale-110 transition-all duration-300">
          Start
          <FaArrowRight className="ml-2 size-10 animate-pulse" />
        </Button>
      </div>
    </main>
  );
}
