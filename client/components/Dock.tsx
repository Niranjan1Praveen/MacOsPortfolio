"use client";

import { useRef } from "react";
import Image from "next/image";
import { dockApps, blogPosts, gallery, techStack, socials } from "@/constants";
import { useWindowStore } from "@/store/windowStore";

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowStore();

  const toggleApp = (app: { id: string; name: string; canOpen: boolean }) => {
    if (!app.canOpen || app.id === "trash") return;

    let data = null;
    switch (app.id) {
      case "safari":
        data = { posts: blogPosts };
        break;
      case "photos":
        data = { gallery, photosLinks: [] };
        break;
      case "terminal":
        data = { techStack };
        break;
      case "contact":
        data = { socials };
        break;
      default:
        data = null;
    }

    openWindow(app.id, app.id, app.name, data);
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon group relative flex flex-col items-center justify-end"
              aria-label={name}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, name, canOpen })}
              style={{ cursor: canOpen ? 'pointer' : 'default' }}
            >
              {/* Tooltip */}
              <span className="tooltip absolute -top-8 opacity-0 group-hover:opacity-100 transition">
                {name}
              </span>

              {/* Icon */}
              <Image
                src={`/images/${icon}`}
                alt={name}
                width={64}
                height={64}
                className={`transition-transform duration-200 group-hover:scale-125 ${
                  !canOpen ? 'opacity-50' : ''
                }`}
                draggable={false}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}