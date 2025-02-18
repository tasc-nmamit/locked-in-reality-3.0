import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import PublicLayout from "~/app/_components/layouts/publicLayout";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "LIR 3.0",
  description: "Locked In Reality 3.0 Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>
          <Toaster />
          <TRPCReactProvider>
            <PublicLayout>{children}</PublicLayout>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
