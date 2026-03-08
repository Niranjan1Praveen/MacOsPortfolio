"use client";

import { useState } from "react";
import Image from "next/image";
import { useWindowStore } from "@/store/windowStore";
import { locations } from "@/constants";

interface FinderWindowProps {
  data: any;
}

export default function FinderWindow({ data }: FinderWindowProps) {
  const folderType = data?.folderType;
  const folderName = data?.folderName;
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>("Work");
  
  const { openWindow } = useWindowStore();

  // Get the three projects from WORK_LOCATION
  const workProjects = locations.work?.children || [];

  // Sidebar structure
  const favoritesItems = ["Work", "About me", "Resume", "Trash"];

  // Handle clicking on a project in the Work section
  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setSelectedFile(null);
    setActiveSidebarItem(project.name);
  };

  // Handle clicking on favorites items
  const handleFavoritesClick = (item: string) => {
    setActiveSidebarItem(item);
    setSelectedProject(null);
    setSelectedFile(null);

    // Open corresponding window based on favorites item
    if (item === "About me") {
      openWindow("finder-about", "finder", "Finder - About me", {
        folderType: "about",
        folderName: "About me",
      });
    } else if (item === "Resume") {
      openWindow("finder-resume", "finder", "Finder - Resume", {
        folderType: "resume",
        folderName: "Resume",
      });
    } else if (item === "Trash") {
      openWindow("finder-trash", "finder", "Finder - Trash", {
        folderType: "trash",
        folderName: "Trash",
      });
    } else if (item === "Work") {
      // Stay in current work view
      setSelectedProject(null);
    }
  };

  // Handle double-click on a file
  const handleFileDoubleClick = (file: any) => {
    setSelectedFile(file);

    // Open file based on type
    if (file.fileType === "txt") {
      openWindow(`txt-${file.id}`, "txtfile", file.name, {
        content: file.description,
        title: file.name,
      });
    } else if (file.fileType === "img") {
      openWindow(`img-${file.id}`, "imgfile", file.name, {
        imageUrl: file.imageUrl,
      });
    } else if (file.fileType === "url") {
      window.open(file.href, "_blank");
    }
  };

  // Render content based on selection
  const renderContent = () => {
    // If a file is selected, show file content
    if (selectedFile) {
      if (selectedFile.fileType === "img") {
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={selectedFile.imageUrl}
              alt={selectedFile.name}
              className="max-w-full max-h-[80%] object-contain rounded-lg"
            />
            <p className="mt-4 text-sm text-gray-600">
              {selectedFile.name}
            </p>
          </div>
        );
      } else if (selectedFile.fileType === "txt") {
        return (
          <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedFile.name}
            </h2>
            {selectedFile.description?.map(
              (para: string, idx: number) => (
                <p key={idx} className="mb-3 text-gray-700">
                  {para}
                </p>
              ),
            )}
          </div>
        );
      }
    }

    // If a project is selected, show its files
    if (selectedProject) {
      return (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {selectedProject.name}
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {selectedProject.children?.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-2 rounded hover:bg-gray-100 cursor-default group"
                onDoubleClick={() => handleFileDoubleClick(item)}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="mb-1 group-hover:scale-110 transition-transform"
                />
                <span className="text-xs text-center truncate w-full">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default view - show all three projects
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-3 gap-6">
          {workProjects.map((project: any) => (
            <div
              key={project.id}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 cursor-default border border-gray-200 transition-all hover:shadow-md"
              onClick={() => handleProjectClick(project)}
              onDoubleClick={() => handleProjectClick(project)}
            >
              <Image
                src={project.icon}
                alt={project.name}
                width={80}
                height={80}
                className="mb-3"
              />
              <span className="text-sm text-center font-medium">
                {project.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 bg-gray-50/50 border-r border-gray-200 p-2 overflow-y-auto">
        {/* Favorites Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">
            Favorites
          </h3>
          <div className="space-y-1">
            {favoritesItems.map((item) => (
              <div
                key={item}
                className={`px-2 py-1.5 text-sm rounded cursor-default flex items-center gap-2 ${
                  activeSidebarItem === item && !selectedProject
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleFavoritesClick(item)}
              >
                {item === "Work" && <span>📁</span>}
                {item === "About me" && <span>👤</span>}
                {item === "Resume" && <span>📄</span>}
                {item === "Trash" && <span>🗑️</span>}
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Work Section - Shows the three projects */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-1">
            Work
          </h3>
          <div className="space-y-1">
            {workProjects.map((project: any) => (
              <div
                key={project.id}
                className={`px-2 py-1.5 text-sm rounded cursor-default flex items-center gap-2 ${
                  selectedProject?.id === project.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleProjectClick(project)}
              >
                <Image src={project.icon} alt="" width={16} height={16} />
                <span className="truncate">{project.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-white/50">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="text-gray-700">Work</span>
          {selectedProject && (
            <>
              <span className="mx-2">›</span>
              <span className="text-gray-700">
                {selectedProject.name}
              </span>
            </>
          )}
          {selectedFile && (
            <>
              <span className="mx-2">›</span>
              <span className="text-gray-700">{selectedFile.name}</span>
            </>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}