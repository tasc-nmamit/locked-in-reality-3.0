"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

const Round2 = () => {
  const router = useRouter();
  const [cameraOn, setCameraOn] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (result && router) {
      router.push(`/start/round2/${result}`);
    }
  }, [result, router]);

  const { ref } = useZxing({
    onDecodeResult: (decodedResult) => {
      setResult(decodedResult.getText());
      setCameraOn(false);
      stopCamera();
    },
    onDecodeError: (err) => {
      setError(err.message);
    },
    paused: !cameraOn,
  });

  const stopCamera = () => {
    try {
      const stream = ref.current?.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
      if (ref.current) {
        ref.current.srcObject = null;
      }
      setCameraOn(false);
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };

  const startCamera = async () => {
    if (!isBrowser) return;

    setError(null);

    if (!navigator?.mediaDevices?.getUserMedia) {
      setError("Camera access is not supported in your browser");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (ref.current) {
        ref.current.srcObject = stream;
        setCameraOn(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Failed to access camera. Please check your permissions.");
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  if (!isBrowser) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-5">
      <div className="relative h-full w-full max-w-md">
        <video
          className="aspect-square w-full rounded-lg border border-emerald-900 bg-black"
          ref={ref as React.RefObject<HTMLVideoElement>}
          playsInline
        />
        {!cameraOn && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg">
            <span className="text-sm text-white">Camera is off</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-x-4">
        <button
          onClick={cameraOn ? stopCamera : startCamera}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
        >
          {cameraOn ? "Stop Scan" : "Start Scan"}
        </button>
      </div>

      {error && !result && (
        <div className="mt-2 rounded p-2 text-center text-sm text-red-500">
          No QR code in sight
        </div>
      )}

      {cameraOn && !result && (
        <div className="mt-2 text-center text-sm text-gray-600">
          <span className="text-amber-500">Note:</span> Position the QR code
          within the camera view. Detection refreshes every 300ms.
        </div>
      )}
    </div>
  );
};

export default Round2;
