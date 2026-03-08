"use client";

import { useEffect, useRef } from "react";

const splitText = (text: string) =>
  text.split("").map((char, i) => (
    <span key={i} className="char inline-block will-change-transform">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const setupMagneticText = (container: HTMLElement, radius = 160, options = { useScale: true, useYOffset: true }) => {
  const chars = container.querySelectorAll<HTMLElement>(".char");

  const mouse = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };

  let hovering = false;
  let animationFrame: number;

  // Target values for smooth interpolation
  const targets = Array.from(chars).map(() => ({
    weight: 400,
    scale: 1,
    y: 0,
  }));

  // Current values for smooth interpolation
  const currents = Array.from(chars).map(() => ({
    weight: 400,
    scale: 1,
    y: 0,
  }));

  const move = (e: MouseEvent) => {
    if (!hovering) return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const enter = () => {
    hovering = true;
  };

  const leave = () => {
    hovering = false;

    // Reset all targets to original values
    chars.forEach((_, i) => {
      targets[i].weight = 400;
      targets[i].scale = 1;
      targets[i].y = 0;
    });
  };

  container.addEventListener("mouseenter", enter);
  container.addEventListener("mouseleave", leave);
  container.addEventListener("mousemove", move);

  const tick = () => {
    // Smooth follow for mouse position
    pos.x += (mouse.x - pos.x) * 0.1;
    pos.y += (mouse.y - pos.y) * 0.1;

    if (hovering) {
      // Update targets based on mouse position
      chars.forEach((char, i) => {
        const rect = char.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = pos.x - cx;
        const dy = pos.y - cy;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const strength = 1 - Math.min(1, dist / radius);
          const eased = 1 - Math.pow(1 - strength, 2);

          targets[i].weight = 400 + Math.round(eased * 500);
          
          // Only update scale and y if enabled
          if (options.useScale) {
            targets[i].scale = 1 + eased * 0.2;
          }
          
          if (options.useYOffset) {
            targets[i].y = -eased * 12;
          }
        } else {
          targets[i].weight = 400;
          
          if (options.useScale) {
            targets[i].scale = 1;
          }
          
          if (options.useYOffset) {
            targets[i].y = 0;
          }
        }
      });
    }

    // Smoothly interpolate current values toward targets
    chars.forEach((char, i) => {
      // Interpolation factor (0.15 = smooth follow, higher = faster)
      const factor = 0.15;

      currents[i].weight += (targets[i].weight - currents[i].weight) * factor;
      
      if (options.useScale) {
        currents[i].scale += (targets[i].scale - currents[i].scale) * factor;
      }
      
      if (options.useYOffset) {
        currents[i].y += (targets[i].y - currents[i].y) * factor;
      }

      // Apply rounded weight for font-weight (needs integer)
      char.style.fontWeight = Math.round(currents[i].weight).toString();
      
      // Build transform string based on enabled options
      let transform = '';
      if (options.useYOffset) {
        transform += `translateY(${currents[i].y}px)`;
      }
      if (options.useScale) {
        transform += ` scale(${currents[i].scale})`;
      }
      
      char.style.transform = transform || 'none';
    });

    animationFrame = requestAnimationFrame(tick);
  };

  animationFrame = requestAnimationFrame(tick);

  return () => {
    container.removeEventListener("mouseenter", enter);
    container.removeEventListener("mouseleave", leave);
    container.removeEventListener("mousemove", move);
    cancelAnimationFrame(animationFrame);
  };
};

export default function Welcome() {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const cleanup1 = setupMagneticText(titleRef.current, 140);
    // Disable scale and Y offset for the portfolio word (only smooth bolding)
    const cleanup2 = setupMagneticText(subtitleRef.current, 200, { 
      useScale: false, 
      useYOffset: false 
    });

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="text-center px-4">
        <p
          ref={titleRef}
          className="pointer-events-auto text-xl md:text-2xl lg:text-3xl mb-4 cursor-default"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 100 }}
        >
          {splitText("Hey, I'm Niranjan! Welcome to my")}
        </p>

        <h1
          ref={subtitleRef}
          className="pointer-events-auto mt-4 md:mt-7 text-6xl md:text-7xl lg:text-8xl xl:text-9xl italic cursor-default"
        >
          {splitText("portfolio.")}
        </h1>
      </div>
    </section>
  );
}