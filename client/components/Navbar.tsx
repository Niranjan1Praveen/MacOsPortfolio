"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { navIcons, navLinks, socials } from "@/constants"; // Make sure to import socials
import { useWindowStore } from "@/store/windowStore";

// Define proper types
interface NavLink {
  id: number;
  name: string;
  type: string;
}

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  
  // Get the openWindow function from your store
  const { openWindow } = useWindowStore();

  // Handler function to open windows
  const handleNavClick = (type: string, name: string) => {
    if (type === "finder") {
      openWindow("finder-main", "finder", "Finder - Projects", { 
        folderType: "work",
        folderName: "Work"
      });
    } else if (type === "contact") {
      // Open the contact window with socials data
      openWindow("contact-window", "contact", "Contact", { 
        socials: socials // Pass the socials data here
      });
    } else if (type === "resume") {
      openWindow("resume-window", "resume", "Resume", {});
    }
  };

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <nav>
      {/* Left section - matches nav div:first-child */}
      <div>
        <Image 
          src="/images/logo.svg" 
          alt="logo" 
          width={15} 
          height={15} 
          className="-translate-y-0.5 dark:invert"
        />
        <p className="font-extrabold">Niranjan's Portfolio</p>
        <ul>
          {navLinks.map((link: NavLink) => (
            <li key={link.id}>
              <button 
                onClick={() => handleNavClick(link.type, link.name)}
                className="hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section - icons and time */}
      <div className="flex items-center gap-3">
        <ul className="gap-6!">
          {navIcons.map((icon) => (
            <li key={icon.id}>
              <Image
                src={icon.img}
                alt={"Icon for " + icon.id}
                width={15}
                height={15}
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer dark:invert"
              />
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          {time && (
            <li>
              <p className="text-xs font-medium cursor-default hover:no-underline">
                {time}
              </p>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}