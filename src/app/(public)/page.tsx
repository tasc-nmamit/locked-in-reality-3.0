"use client";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import Footer from "../_components/footer/footer";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative h-screen w-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-fit bg-gradient-to-b from-purple-800 via-purple-300 to-purple-900 bg-clip-text">
          <header className="text-center font-rosca text-6xl font-bold text-transparent md:text-8xl">
            Locked In <br /> Reality 3.0
          </header>
        </div>
        <div>
          <p className="mx-auto my-6 max-w-xl text-center text-sm font-medium text-white md:text-xl">
            Dive into world of mystery and adventure. Performe well and prove
            your might among the best.
          </p>
        </div>
        <div className="mt-10 flex w-full justify-center gap-4">
          <Button
            onClick={() => router.push("/rules")}
            className="rounded-full border-2 border-white/20 bg-gradient-to-r from-slate-950 to-slate-800 p-6 text-xl transition-all duration-300 hover:scale-105 md:p-8 md:text-2xl"
          >
            Rules
          </Button>
          <Button
            onClick={() => router.push("/start")}
            className="relative rounded-full border-2 border-white/20 bg-gradient-to-r from-purple-900 via-purple-500 to-purple-600 p-6 pr-3 text-xl transition-all duration-300 hover:scale-105 md:p-8 md:pr-5 md:text-2xl"
          >
            Start
            <FaArrowRight className="ml-0 size-6 animate-pulse md:ml-2 md:size-10" />
          </Button>
        </div>
      </div>
      <Footer className="absolute bottom-0" />
    </main>
  );
}
