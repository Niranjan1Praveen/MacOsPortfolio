"use client";

import { useState, useEffect } from "react";
import Dock from "@/components/Dock";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import WindowManager from "@/components/WindowManager";
import DesktopFolder from "@/components/DesktopFolder";
import { useWindowStore } from "@/store/windowStore";

function Home() {
  const { desktopFolders } = useWindowStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Check if user has seen the tip before
    const hasSeenTip = localStorage.getItem("hasSeenDoubleClickTip");
    
    if (!hasSeenTip) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleToastDismiss = () => {
    setShowToast(false);
    localStorage.setItem("hasSeenDoubleClickTip", "true");
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Welcome/>
      
      <MacOSToast show={showToast} onDismiss={handleToastDismiss} />
      
      <DesktopFolder
        id="nike-folder"
        name="Nike Ecommerce"
        icon="/images/folder.png"
        folderType="work"
        projectId={5}
        initialPosition={desktopFolders["nike-folder"]?.position || { x: 50, y: 150 }}
      />
      <DesktopFolder
        id="ai-resume-folder"
        name="AI Resume Analyzer"
        icon="/images/folder.png"
        folderType="work"
        projectId={6}
        initialPosition={desktopFolders["ai-resume-folder"]?.position || { x: 250, y: 150 }}
      />
      <DesktopFolder
        id="food-delivery-folder"
        name="Food Delivery App"
        icon="/images/folder.png"
        folderType="work"
        projectId={7}
        initialPosition={desktopFolders["food-delivery-folder"]?.position || { x: 450, y: 150 }}
      />
      
      <WindowManager />
      <Dock />
    </div>
  );
}

export default Home;