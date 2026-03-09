"use client";

import { useState } from "react";
import Dock from "@/components/Dock";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import WindowManager from "@/components/WindowManager";
import LoadingScreen from "@/components/LoadingScreen";
import ScreenSizeWarning from "@/components/ScreenSizeWarning";
import { useWindowStore } from "@/store/windowStore";
import DesktopFolders from "@/components/DesktopFolders";

function Home() {
  const { desktopFolders } = useWindowStore();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <LoadingScreen onLoadingComplete={() => setLoading(false)} />
      ) : (
        <ScreenSizeWarning>
          <div className="relative min-h-screen">
            <Navbar />
            <Welcome />
            <DesktopFolders />
            <WindowManager />
            <Dock />
          </div>
        </ScreenSizeWarning>
      )}
    </>
  );
}

export default Home;
