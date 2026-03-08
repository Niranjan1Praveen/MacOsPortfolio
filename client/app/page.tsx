"use client";

import Dock from "@/components/Dock";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import WindowManager from "@/components/WindowManager";
import DesktopFolder from "@/components/DesktopFolder";
import { useWindowStore } from "@/store/windowStore";
import MacOSToast from "@/components/MacOSToast";

function Home() {
  const { desktopFolders } = useWindowStore();

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Welcome/>
      
      <MacOSToast />
      
      <DesktopFolder
        id="nike-folder"
        name="Nike Ecommerce"
        icon="/images/folder.png"
        folderType="work"
        projectId={5}
        initialPosition={desktopFolders["nike-folder"]?.position || { x: 50, y: 100 }}
      />
      <DesktopFolder
        id="ai-resume-folder"
        name="AI Resume Analyzer"
        icon="/images/folder.png"
        folderType="work"
        projectId={6}
        initialPosition={desktopFolders["ai-resume-folder"]?.position || { x: 50, y: 240 }}
      />
      <DesktopFolder
        id="food-delivery-folder"
        name="Food Delivery App"
        icon="/images/folder.png"
        folderType="work"
        projectId={7}
        initialPosition={desktopFolders["food-delivery-folder"]?.position || { x: 50, y: 380 }}
      />
      
      <WindowManager />
      <Dock />
    </div>
  );
}

export default Home;