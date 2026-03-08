"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Faster fade out
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 300); // Reduced from 500ms to 300ms
          }, 200); // Reduced from 500ms to 200ms

          return 100;
        }

        // Faster increment
        const increment = prev < 30 ? 1 : prev < 70 ? 2 : 4; // Doubled all increments
        return Math.min(prev + increment, 100);
      });
    }, 30); // Reduced from 50ms to 30ms

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Apple Logo */}
      <div className="mb-12 relative">
        <div className="w-24 h-24 md:w-24 md:h-30 relative">
          {" "}
          {/* Slightly smaller */}
          <Image
            src="/images/logo.svg"
            alt="Apple Logo"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full -z-10" />{" "}
        {/* Reduced blur */}
      </div>

      {/* Progress Bar Container */}
      <div className="w-56 md:w-72 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* macOS-style dots at the bottom */}
      <div className="absolute bottom-8 flex gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
      </div>
    </div>
  );
}
