import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-w-screen flex min-h-screen items-center justify-center"
      style={{ background: "url(/background.jpg)" }}
    >
      {children}
    </div>
  );
}
