"use client";

import { useState } from "react";
import Image from "next/image";
import { photosLinks } from "@/constants";

interface PhotosWindowProps {
  data: any;
}

export default function PhotosWindow({ data }: PhotosWindowProps) {
  const [activeTab, setActiveTab] = useState("Library");

  const renderContent = () => {
    switch (activeTab) {
      case "Library":
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg
              className="w-24 h-24 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Library</h3>
            <p className="text-center">
              Your cherished moments will appear here
            </p>
          </div>
        );

      case "Memories":
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg
              className="w-24 h-24 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Memories</h3>
            <p className="text-center">
              Your cherished moments will appear here
            </p>
          </div>
        );

      case "Places":
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg
              className="w-24 h-24 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Places</h3>
            <p className="text-center">
              Photos grouped by location will appear here
            </p>
          </div>
        );

      case "People":
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg
              className="w-24 h-24 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">People</h3>
            <p className="text-center">
              Photos of your friends and family will appear here
            </p>
          </div>
        );

      case "Favorites":
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <svg
              className="w-24 h-24 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Favorites</h3>
            <p className="text-center">Your favorite photos will appear here</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 border-r border-gray-200 dark:border-none bg-gray-50/50 dark:bg-[#323232] p-3 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 px-2 text-gray-900 dark:text-gray-200">
          Photos
        </h2>
        <div className="space-y-1">
          {photosLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.title)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === link.title
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-[#323232] text-gray-700 dark:text-gray-300"
              }`}
            >
              <Image
                src={link.icon}
                alt={link.title}
                width={18}
                height={18}
                className={
                  activeTab === link.title
                    ? "brightness-0 invert"
                    : "dark:brightness-0 dark:invert"
                }
              />
              <span>{link.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-[#1E1E1E]">
        {renderContent()}
      </div>
    </div>
  );
}
