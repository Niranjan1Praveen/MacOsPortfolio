"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useWindowStore } from "@/store/windowStore";
import { locations } from "@/constants";
import { useTheme } from "next-themes";

interface FinderWindowProps {
  data: any;
}

export default function FinderWindow({ data }: FinderWindowProps) {
  const { theme } = useTheme();
  const folderType = data?.folderType;
  const folderName = data?.folderName;
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>("Work");

  const { openWindow } = useWindowStore();

  // Get data from locations
  const workProjects = locations.work?.children || [];
  const resumeData = locations.resume;
  const trashData = locations.trash;
  const aboutData = locations.about;

  // Sidebar structure with icons from locations
  const favoritesItems = [
    {
      name: "Work",
      icon: locations.work?.icon || "/icons/work.svg",
      type: "work",
    },
    {
      name: "About me",
      icon: locations.about?.icon || "/icons/info.svg",
      type: "about",
    },
    {
      name: "Resume",
      icon: locations.resume?.icon || "/icons/file.svg",
      type: "resume",
    },
    {
      name: "Trash",
      icon: locations.trash?.icon || "/icons/trash.svg",
      type: "trash",
    },
  ];

  const isDark = theme === "dark";

  useEffect(() => {
    if (data?.initialProject) {
      setSelectedProject(data.initialProject);
      setActiveSidebarItem("Work");
    } else if (data?.projectId) {
      const project = workProjects.find((p: any) => p.id === data.projectId);
      if (project) {
        setSelectedProject(project);
        setActiveSidebarItem("Work");
      }
    }
  }, [data?.projectId, data?.initialProject, workProjects]);

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
  };

  // Handle double-click on a file
  const handleFileDoubleClick = (file: any) => {
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
    } else if (file.fileType === "pdf") {
      if (file.href) {
        window.open(file.href, "_blank");
      }
    }
  };

  // Render content based on active sidebar item
  const renderContent = () => {
    // Resume view in FinderWindow.tsx
    if (activeSidebarItem === "Resume") {
      return (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {resumeData?.children?.map((item: any) => (
              <div
                key={item.id}
                className={`flex flex-col items-center p-4 rounded-lg cursor-default hover:cursor-pointer group transition-colors ${
                  isDark ? "hover:bg-[#323232]" : "hover:bg-gray-100"
                }`}
                onDoubleClick={() => {
                  openWindow("resume-window", "resume", "Resume", {});
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="mb-2 group-hover:scale-110 transition-transform"
                />
                <span
                  className={`text-xs text-center truncate max-w-full ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Trash view
    if (activeSidebarItem === "Trash") {
      return (
        <div>
          <div className="grid grid-cols-4 gap-4">
            {trashData?.children?.map((item: any) => (
              <div
                key={item.id}
                className={`flex flex-col items-center p-2 rounded cursor-default hover:cursor-pointer group transition-colors ${
                  isDark ? "hover:bg-[#323232]" : "hover:bg-gray-100"
                }`}
                onDoubleClick={() => handleFileDoubleClick(item)}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="mb-2 group-hover:scale-110 transition-transform"
                />
                <span
                  className={`text-xs text-center truncate w-full ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // About me view
    if (activeSidebarItem === "About me") {
      // Filter image files and text file
      const imageFiles =
        aboutData?.children?.filter((item: any) => item.fileType === "img") ||
        [];
      const textFile = aboutData?.children?.find(
        (item: any) => item.fileType === "txt",
      );

      // Combine all files for a single grid
      const allFiles = [...imageFiles];
      if (textFile) allFiles.push(textFile);

      return (
        <div className="h-full w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-min">
            {allFiles.map((item: any) => (
              <div
                key={item.id}
                className={`flex flex-col items-center p-4 rounded-lg cursor-default hover:cursor-pointer group transition-colors ${
                  isDark ? "hover:bg-[#323232]" : "hover:bg-gray-100"
                }`}
                onDoubleClick={() => handleFileDoubleClick(item)}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={item.fileType === "txt" ? 80 : 64}
                  height={item.fileType === "txt" ? 80 : 64}
                  className="mb-3 group-hover:scale-110 transition-transform"
                />
                <span
                  className={`text-xs text-center truncate max-w-full ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

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
            <p
              className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {selectedFile.name}
            </p>
          </div>
        );
      } else if (selectedFile.fileType === "txt") {
        return (
          <div className="p-6 overflow-y-auto h-full">
            <h2
              className={`text-xl font-bold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"}`}
            >
              {selectedFile.name}
            </h2>
            {selectedFile.description?.map((para: string, idx: number) => (
              <p
                key={idx}
                className={`mb-3 ${isDark ? "text-gray-400" : "text-gray-700"}`}
              >
                {para}
              </p>
            ))}
          </div>
        );
      }
    }

    // If a project is selected, show its files
    if (selectedProject) {
      return (
        <div>
          <h2
            className={`text-lg font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-900"}`}
          >
            {selectedProject.name}
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {selectedProject.children?.map((item: any) => (
              <div
                key={item.id}
                className={`flex flex-col items-center p-2 rounded cursor-default group transition-colors ${
                  isDark ? "hover:bg-[#323232]" : "hover:bg-gray-100"
                }`}
                onDoubleClick={() => handleFileDoubleClick(item)}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="mb-1 group-hover:scale-110 transition-transform"
                />
                <span
                  className={`text-xs text-center truncate w-full ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-3 gap-6">
          {workProjects.map((project: any) => (
            <div
              key={project.id}
              className={`flex flex-col items-center p-4 rounded-lg cursor-default hover:cursor-pointer transition-all ${
                isDark
                  ? "border-gray-700 hover:bg-[#323232] hover:shadow-xl"
                  : "border-gray-200 hover:bg-gray-100 hover:shadow-md"
              }`}
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
              <span
                className={`text-sm text-center font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
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
      <div
        className={`w-48 border-r p-2 overflow-y-auto transition-colors ${
          isDark ? "bg-[#323232] border-none" : "bg-gray-50/50 border-gray-200"
        }`}
      >
        {/* Favorites Section */}
        <div className="mb-6">
          <h3
            className={`text-xs font-semibold uppercase px-2 mb-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Favorites
          </h3>
          <div className="space-y-1">
            {favoritesItems.map((item) => (
              <div
                key={item.name}
                className={`px-2 py-1.5 text-sm rounded cursor-pointer flex items-center gap-2 transition-colors ${
                  activeSidebarItem === item.name
                    ? "bg-blue-500 text-white"
                    : isDark
                      ? "hover:bg-[#3a3a3a] text-gray-300"
                      : "hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleFavoritesClick(item.name)}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={16}
                  height={16}
                  className={
                    activeSidebarItem === item.name ? "brightness-0 invert" : ""
                  }
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Work Section - Shows the three projects (only when Work is active) */}
        {activeSidebarItem === "Work" && (
          <div>
            <h3
              className={`text-xs font-semibold uppercase px-2 mb-1 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Work
            </h3>
            <div className="space-y-1">
              {workProjects.map((project: any) => (
                <div
                  key={project.id}
                  className={`px-2 py-1.5 text-sm rounded cursor-pointer flex items-center gap-2 transition-colors ${
                    selectedProject?.id === project.id
                      ? "bg-blue-500 text-white"
                      : isDark
                        ? "hover:bg-[#3a3a3a] text-gray-300"
                        : "hover:bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleProjectClick(project)}
                >
                  <Image src={project.icon} alt="" width={16} height={16} />
                  <span className="truncate">{project.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 p-4 overflow-y-auto transition-colors ${
          isDark ? "bg-[#1E1E1E]" : "bg-white/50"
        }`}
      >
        {/* Breadcrumb */}
        <div
          className={`text-sm mb-4 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span className={isDark ? "text-gray-300" : "text-gray-700"}>
            {activeSidebarItem}
          </span>
          {selectedProject && (
            <>
              <span className="mx-2">›</span>
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                {selectedProject.name}
              </span>
            </>
          )}
          {selectedFile && (
            <>
              <span className="mx-2">›</span>
              <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                {selectedFile.name}
              </span>
            </>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
