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
  projectId,
  initialPosition 
}: DesktopFolderProps) {
  const folderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);
  
  const { openWindow, focusWindow, windows, updateFolderPosition } = useWindowStore();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const rect = folderRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
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
        y: Math.max(80, Math.min(newY, maxY)),
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
    // Find the project from workProjects
    const workProjects = locations.work?.children || [];
    const project = workProjects.find((p: any) => p.id === projectId);
    
    if (!project) return;

    // Check if Finder window is already open
    const existingFinder = Object.values(windows).find(
      (w: any) => w.type === "finder" && w.data?.projectId === projectId
    );

    if (existingFinder) {
      // If window exists, just focus it
      focusWindow(existingFinder.id);
    } else {
      // Open new Finder window with the project selected
      openWindow(
        `finder-${projectId}`,
        "finder",
        `Finder - ${project.name}`,
        { 
          folderType: "work", 
          folderName: project.name,
          projectId: projectId,
          initialProject: project // Pass the project data to auto-select it
        }
      );
    }
  };

  return (
    <div
      ref={folderRef}
      className="absolute flex flex-col items-center w-24 cursor-default hover:cursor-grab select-none group"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : 10,
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
      <div className="px-2 py-1 rounded text-white text-xs text-center">
        {name}
      </div>
    </div>
  );
}