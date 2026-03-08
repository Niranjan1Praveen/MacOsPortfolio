"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useWindowStore } from "@/store/windowStore";
import { locations } from "@/constants";

interface DesktopFolderProps {
  id: string;
  name: string;
  icon: string;
  folderType: string;
  projectId?: number;
  initialPosition: { x: number; y: number };
}

export default function DesktopFolder({ 
  id, 
  name, 
  icon, 
  folderType,
  initialPosition 
}: DesktopFolderProps) {
  const folderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);
  
  const { openWindow, updateFolderPosition } = useWindowStore();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const rect = folderRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 150;
      
      const newPosition = {
        x: Math.max(10, Math.min(newX, maxX)),
        y: Math.max(80, Math.min(newY, maxY))
      };
      
      setPosition(newPosition);
      updateFolderPosition(id, newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, updateFolderPosition]);

  const handleDoubleClick = () => {
    // Open the folder in Finder
    openWindow(
      `finder-${folderType}`,
      "finder",
      `Finder - ${name}`,
      { folderType, folderName: name }
    );
  };

  return (
    <div
      ref={folderRef}
      className="absolute flex flex-col items-center w-24 cursor-default select-none group"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 10
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className={`w-16 h-16 mb-1 transition-transform ${isDragging ? 'scale-110 opacity-70' : 'group-hover:scale-105'}`}>
        <Image
          src={icon}
          alt={name}
          width={64}
          height={64}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="px-2 py-1 rounded bg-black/30 backdrop-blur-sm text-white text-xs text-center">
        {name}
      </div>
    </div>
  );
}