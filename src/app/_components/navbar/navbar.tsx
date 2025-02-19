"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { cn } from "~/lib/utils";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { AlignRight, X } from "lucide-react";

export const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Rules",
    link: "/rules",
  },
  {
    name: "Start",
    link: "/start",
  },
  {
    name: "Leaderboard",
    link: "/leaderboard",
  },
];

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);

  return (
    <nav className="fixed left-1/2 top-2 z-50 w-full -translate-x-1/2 transform p-4 md:top-4">
      <div className="relative mx-auto w-full max-w-7xl rounded-full bg-purple-500/30 p-4 px-8 backdrop-blur-sm">
        <div className="flex h-full w-full flex-row items-center justify-between">
          <div
            className="h-fit w-fit bg-clip-text pr-2"
            style={{
              backgroundImage: "url(/stone2.jpg)",
              backgroundSize: "fit",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Link
              href={"/"}
              className="pb-1 text-center font-rosca text-3xl font-extrabold text-transparent"
            >
              LIR 3.0
            </Link>
          </div>
          <DestopNav />
          <MobileNav setOpen={setOpen} open={open} />
        </div>

        <div
          className={`absolute left-0 top-20 flex w-full flex-col gap-2 rounded-xl bg-purple-500/30 backdrop-blur-md text-center text-white transition-all duration-300 ${open ? "max-h-96 overflow-auto" : "max-h-0 overflow-hidden p-0"}`}
          style={{ transition: "max-height 0.3s ease-in-out" }}
        >
          <div className="flex flex-col justify-center gap-4 object-cover p-4">
            {navItems.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.link}
                  className={cn(
                    `text-lg font-bold text-white`,
                    // (pathname === "/" && item.link === "/") ||
                    //   (item.link !== "/" ? pathname.match(item.link) : false)
                    //   ? "rounded-full border px-2"
                    //   : "",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="pb-4">
            {session.status === "unauthenticated" ? (
              <Button onClick={() => router.push("/auth/login")}>SignIn</Button>
            ) : (
              <Button
                onClick={() =>
                  signOut({
                    redirect: false,
                    callbackUrl: "/",
                  })
                }
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function DestopNav() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  return (
    <>
      <div className="hidden gap-6 md:flex">
        {navItems.map((item, idx) => {
          return (
            <Link
              key={idx}
              href={item.link}
              className={cn(
                `text-lg font-bold text-white`,
                (pathname === "/" && item.link === "/") ||
                  (item.link !== "/" ? pathname.match(item.link) : false)
                  ? "rounded-full border px-2"
                  : "",
              )}
            >
              {item.name}
              {/* {!pathname.match(item.link) && <div className="bg-white h-1 w-0"></div>} */}
            </Link>
          );
        })}
      </div>
      <div className="hidden md:flex">
        {session.status === "unauthenticated" ? (
          <Button onClick={() => router.push("/auth/login")}>SignIn</Button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src={session.data?.user.image ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mt-4">
              <div>
                <Image
                  src={session.data?.user.image ?? ""}
                  className="mx-auto mt-4 size-32 rounded-lg"
                  alt="user"
                  width={200}
                  height={200}
                />
                <h1 className="mt-2 text-center text-2xl font-bold">
                  {session.data?.user.name}
                </h1>
                <h2 className="mb-4 text-center opacity-70">
                  {session.data?.user.email}
                </h2>
              </div>
              <Separator className="bg-slate-400" />
              <div className="mt-4 flex justify-center">
                <Button
                  className="w-full max-w-52"
                  onClick={() =>
                    signOut({
                      redirect: false,
                      callbackUrl: "/",
                    })
                  }
                >
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
}

function MobileNav({
  setOpen,
  open,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-center md:hidden">
      <button
        className="flex size-8 items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="stroke-white" />
        ) : (
          <AlignRight className="stroke-white" />
        )}
      </button>
      {/* <div className={`absolute -bottom-10 flex flex-col w-full bg-white/30`}>
        {navItems.map((item, idx) => {
          return (
            <Link
              key={idx}
              href={item.link}
              className={cn(
                `text-lg font-bold text-white`,
                pathname.match(item.link) ? "rounded-full border px-2" : "",
              )}
            >
              {item.name}
              {!pathname.match(item.link) && <div className="bg-white h-1 w-0"></div>}
            </Link>
          )
        })}
      </div> */}
    </div>
  );
}
