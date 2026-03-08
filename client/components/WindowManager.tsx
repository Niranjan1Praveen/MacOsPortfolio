"use client";

import { useWindowStore } from "@/store/windowStore";
import Window from "./Window";

export default function WindowManager() {
  const { windows } = useWindowStore();

  return (
    <>
      {Object.entries(windows).map(([id, windowData]) => (
        <Window
          key={id}
          id={id}
          title={windowData.title}
          type={windowData.type}
          data={windowData.data}
        />
      ))}
    </>
  );
}