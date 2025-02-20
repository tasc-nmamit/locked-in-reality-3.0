import React from "react";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`w-full text-sm text-white/50 ${className}`}>
      <div className="flex w-full flex-col items-center gap-2 px-2 py-6 backdrop-blur-sm">
        <p>Locked In Reality 3.0 | TASC</p>
        <p>Made with ❤️ by TASC Technical Team</p>
      </div>
    </footer>
  );
}
