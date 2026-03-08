"use client";

import { useRef, useState, useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";

interface BaseWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function BaseWindow({ id, title, children }: BaseWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  
  const {
    windows,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore();

  const windowData = windows[id];
  if (!windowData || windowData.isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isResizing) return;

    focusWindow(id);

    if (e.target instanceof HTMLElement && e.target.closest(".window-header")) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    focusWindow(id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowData.isMaximized) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        const maxX = window.innerWidth - windowData.size.width;
        const maxY = window.innerHeight - windowData.size.height - 80;

        updateWindowPosition(id, {
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }

      if (isResizing && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        let newWidth = windowData.size.width;
        let newHeight = windowData.size.height;
        let newX = windowData.position.x;
        let newY = windowData.position.y;

        if (resizeDirection?.includes("e")) {
          newWidth = Math.max(300, e.clientX - rect.left);
        }
        if (resizeDirection?.includes("w")) {
          const delta = rect.right - e.clientX;
          newWidth = Math.max(300, delta);
          newX = e.clientX;
        }
        if (resizeDirection?.includes("s")) {
          newHeight = Math.max(200, e.clientY - rect.top);
        }
        if (resizeDirection?.includes("n")) {
          const delta = rect.bottom - e.clientY;
          newHeight = Math.max(200, delta);
          newY = e.clientY;
        }

        updateWindowSize(id, { width: newWidth, height: newHeight });
        if (newX !== windowData.position.x || newY !== windowData.position.y) {
          updateWindowPosition(id, { x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragOffset,
    resizeDirection,
    windowData,
    id,
    updateWindowPosition,
    updateWindowSize,
  ]);

  return (
    <div
      ref={windowRef}
      className="fixed bg-white/90 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
      style={{
        left: windowData.position.x,
        top: windowData.position.y,
        width: windowData.size.width,
        height: windowData.size.height,
        zIndex: windowData.zIndex,
        display: windowData.isMinimized ? "none" : "block",
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div className="window-header h-10 bg-gray-100/80 backdrop-blur-sm border-b border-gray-200 flex items-center px-3 cursor-move select-none">
        <div className="flex gap-2 mr-4">
          <button
            onClick={() => closeWindow(id)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none"
          />
          <button
            onClick={() => minimizeWindow(id)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
          />
          <button
            onClick={() =>
              windowData.isMaximized ? restoreWindow(id) : maximizeWindow(id)
            }
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"
          />
        </div>

        <div className="flex-1 text-center text-sm font-medium text-gray-700 truncate">
          {title}
        </div>

        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto">
        {children}
      </div>

      {/* Resize Handles */}
      <div
        className="absolute top-0 left-0 w-2 h-full cursor-w-resize hover:bg-blue-200/50"
        onMouseDown={(e) => handleResizeStart(e, "w")}
      />
      <div
        className="absolute top-0 right-0 w-2 h-full cursor-e-resize hover:bg-blue-200/50"
        onMouseDown={(e) => handleResizeStart(e, "e")}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize hover:bg-blue-200/50"
        onMouseDown={(e) => handleResizeStart(e, "s")}
      />
      <div
        className="absolute top-0 left-0 w-full h-2 cursor-n-resize hover:bg-blue-200/50"
        onMouseDown={(e) => handleResizeStart(e, "n")}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={(e) => handleResizeStart(e, "se")}
      />
    </div>
  );
}