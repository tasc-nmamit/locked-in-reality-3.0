"use client";
import Particles from "react-tsparticles";
import { particlesConfig } from "./particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import Navbar from "~/app/_components/navbar/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const particlesInit = useCallback(async (engine: Engine) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await loadSlim(engine, true);
  }, []);

  const particlesLoaded = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    async (container: Container | undefined) => {
      await new Promise<void>((resolve) => resolve());
    },
    [],
  );

  return (
    <div
      className="min-w-screen min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950"
      style={{ background: "url(/background.jpg)" }}
    >
      <Navbar />
      <Particles
        init={particlesInit}
        // @ts-expect-error Option_error
        options={particlesConfig}
        loaded={particlesLoaded}
        className="absolute left-0 top-0 z-0 h-full w-full"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
