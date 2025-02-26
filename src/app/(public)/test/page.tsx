import React from "react";
import ColorMatcher from "~/app/_components/colorMatcher/colorMatcher";
import EncodedText from "~/app/_components/encoded-text/encoded-text";

export default function page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {/* <ColorMatcher /> */}
      <EncodedText />
    </div>
  );
}
