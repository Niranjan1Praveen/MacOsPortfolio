"use client";

import { useEffect, useState } from "react";

interface ScreenSizeWarningProps {
  children: React.ReactNode;
}

export default function ScreenSizeWarning({ children }: ScreenSizeWarningProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return;

    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px is Tailwind's lg breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // If it's a large screen, render children
  if (isLargeScreen) {
    return <>{children}</>;
  }

  // Otherwise, show the warning message
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
      <div className="max-w-md mx-auto p-8 text-center">
        {/* macOS-style window dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Finder icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-500 rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Desktop Experience Only
        </h1>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          This portfolio is designed as a macOS-style experience and works best on larger screens. 
          Please visit on a desktop or tablet for the full experience.
        </p>

        {/* Screen size indicator */}
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-gray-400 mb-2">Minimum screen size required:</p>
          <div className="flex items-center justify-center gap-4 text-white">
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">1024px</span>
            </div>
            <span className="text-gray-500">+</span>
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Desktop</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}