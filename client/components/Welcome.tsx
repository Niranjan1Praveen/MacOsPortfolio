"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const splitText = (text: string) =>
  text.split("").map((char, i) => (
    <span key={i} className="char inline-block will-change-transform">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const setupMagneticText = (container: HTMLElement, radius = 160) => {
  const chars = container.querySelectorAll<HTMLElement>(".char");

  const mouse = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };

  let hovering = false;
  let animationFrame: number;

  // Target values for smooth interpolation
  const targets = Array.from(chars).map(() => ({
    weight: 400,
    scale: 1,
    y: 0
  }));

  // Current values for smooth interpolation
  const currents = Array.from(chars).map(() => ({
    weight: 400,
    scale: 1,
    y: 0
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
          targets[i].scale = 1 + eased * 0.2;
          targets[i].y = -eased * 12;
        } else {
          targets[i].weight = 400;
          targets[i].scale = 1;
          targets[i].y = 0;
        }
      });
    }

    // Smoothly interpolate current values toward targets
    chars.forEach((char, i) => {
      // Interpolation factor (0.15 = smooth follow, higher = faster)
      const factor = 0.15;
      
      currents[i].weight += (targets[i].weight - currents[i].weight) * factor;
      currents[i].scale += (targets[i].scale - currents[i].scale) * factor;
      currents[i].y += (targets[i].y - currents[i].y) * factor;

      // Apply rounded weight for font-weight (needs integer)
      char.style.fontWeight = Math.round(currents[i].weight).toString();
      char.style.transform = `translateY(${currents[i].y}px) scale(${currents[i].scale})`;
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
    const cleanup2 = setupMagneticText(subtitleRef.current, 200);

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
          className="pointer-events-auto text-2xl md:text-3xl lg:text-4xl font-georama mb-4"
          style={{ cursor: 'default' }}
        >
          {splitText("Hey, I'm Niranjan! Welcome to my")}
        </p>

        <h1
          ref={subtitleRef}
          className="pointer-events-auto mt-4 md:mt-7 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-georama italic"
          style={{ cursor: 'default' }}
        >
          {splitText("portfolio.")}
        </h1>
      </div>
    </section>
  );
}