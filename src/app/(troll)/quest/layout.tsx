import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/sonner";

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
      <body className="bg-cover bg-fixed bg-center">
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
