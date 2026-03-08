"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function MacOSToast() {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only show if not shown yet in this session
    if (hasShown) return;

    const timer = setTimeout(() => {
      const toastId = toast.custom(
        (t) => (
          <div className="w-[320px] bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden">   
            {/* Content */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-start gap-3">
                {/* Finder icon */}
                <div className="shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">Finder Tip</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Double-click folders to open them. Single click to select.
                  </p>
                </div>
              </div>
              
              {/* Got it button */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    toast.dismiss(t);
                    setHasShown(true);
                  }}
                  className="text-xs px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        ),
        {
          duration: 8000,
          position: "top-right",
          unstyled: true,
          onDismiss: () => setHasShown(true),
          onAutoClose: () => setHasShown(true),
        }
      );

      return () => {
        toast.dismiss(toastId);
      };
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasShown]);

  return null;
}