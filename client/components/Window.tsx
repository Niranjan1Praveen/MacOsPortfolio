"use client";

import { useRef, useState, useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";
import { locations } from "@/constants";

interface WindowProps {
  id: string;
  title: string;
  type: string;
  data?: any;
}

export default function Window({ id, title, type, data }: WindowProps) {
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
    restoreWindow, // Make sure this is included
    updateWindowPosition,
    updateWindowSize 
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
          y: e.clientY - rect.top
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
        
        // Keep window within viewport bounds
        const maxX = window.innerWidth - windowData.size.width;
        const maxY = window.innerHeight - windowData.size.height - 80; // Leave space for dock
        
        updateWindowPosition(id, {
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }

      if (isResizing && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        let newWidth = windowData.size.width;
        let newHeight = windowData.size.height;
        let newX = windowData.position.x;
        let newY = windowData.position.y;

        if (resizeDirection?.includes('e')) {
          newWidth = Math.max(300, e.clientX - rect.left);
        }
        if (resizeDirection?.includes('w')) {
          const delta = rect.right - e.clientX;
          newWidth = Math.max(300, delta);
          newX = e.clientX;
        }
        if (resizeDirection?.includes('s')) {
          newHeight = Math.max(200, e.clientY - rect.top);
        }
        if (resizeDirection?.includes('n')) {
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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDirection, windowData, id, updateWindowPosition, updateWindowSize]);

  const renderContent = () => {
    switch (type) {
      case "safari":
        return (
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Articles</h2>
            {/* Render blog posts here */}
            <div className="grid gap-4">
              {data?.posts?.map((post: any) => (
                <div key={post.id} className="border rounded p-3">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.date}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "photos":
        return (
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-3 gap-2">
              {data?.gallery?.map((item: any) => (
                <img key={item.id} src={item.img} alt="" className="w-full h-24 object-cover rounded" />
              ))}
            </div>
          </div>
        );
      
      case "terminal":
        return (
          <div className="p-4 h-full overflow-y-auto bg-black text-green-400 font-mono">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            {data?.techStack?.map((category: any, i: number) => (
              <div key={i} className="mb-4">
                <p className="text-white">{category.category}:</p>
                <p className="ml-4">{category.items.join(" • ")}</p>
              </div>
            ))}
          </div>
        );
      
      case "contact":
        return (
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <div className="space-y-4">
              {data?.socials?.map((social: any) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
                >
                  <img src={social.icon} alt={social.text} className="w-6 h-6" />
                  <span>{social.text}</span>
                </a>
              ))}
            </div>
          </div>
        );
      
      case "finder":
        return (
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            {/* Render projects from WORK_LOCATION */}
            <div className="space-y-4">
              {locations.work.children.map((project: any) => (
                <div key={project.id} className="border rounded p-3">
                  <h3 className="font-semibold">{project.name}</h3>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "resume":
        return (
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Resume</h2>
            <div className="text-center p-8">
              <p>Resume content goes here</p>
            </div>
          </div>
        );
      
      default:
        return <div className="p-4">Content for {type}</div>;
    }
  };

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
        display: windowData.isMinimized ? 'none' : 'block'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div className="window-header h-10 bg-gray-100/80 backdrop-blur-sm border-b border-gray-200 flex items-center px-3 cursor-move select-none">
        {/* Window Controls */}
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
            onClick={() => windowData.isMaximized ? restoreWindow(id) : maximizeWindow(id)}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"
          />
        </div>
        
        {/* Window Title */}
        <div className="flex-1 text-center text-sm font-medium text-gray-700 truncate">
          {title}
        </div>
        
        {/* Empty div for balance */}
        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto">
        {renderContent()}
      </div>

      {/* Resize Handles */}
      <div className="absolute top-0 left-0 w-2 h-full cursor-w-resize hover:bg-blue-200/50"
           onMouseDown={(e) => handleResizeStart(e, 'w')} />
      <div className="absolute top-0 right-0 w-2 h-full cursor-e-resize hover:bg-blue-200/50"
           onMouseDown={(e) => handleResizeStart(e, 'e')} />
      <div className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize hover:bg-blue-200/50"
           onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="absolute top-0 left-0 w-full h-2 cursor-n-resize hover:bg-blue-200/50"
           onMouseDown={(e) => handleResizeStart(e, 'n')} />
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
           onMouseDown={(e) => handleResizeStart(e, 'se')} />
    </div>
  );
}