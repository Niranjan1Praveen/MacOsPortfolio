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
      <Welcome />

      <MacOSToast />

      <DesktopFolder
        id="echowithin-folder"
        name="EchoWithin"
        icon="/images/folder.png"
        folderType="work"
        projectId={5}
        initialPosition={
          desktopFolders["echowithin-folder"]?.position || { x: 50, y: 100 }
        }
      />
      <DesktopFolder
        id="adversanet-folder"
        name="AdversaNet"
        icon="/images/folder.png"
        folderType="work"
        projectId={6}
        initialPosition={
          desktopFolders["adversanet-folder"]?.position || { x: 50, y: 240 }
        }
      />
      <DesktopFolder
        id="exoplanetarium-folder"
        name="Exoplanetarium"
        icon="/images/folder.png"
        folderType="work"
        projectId={7}
        initialPosition={
          desktopFolders["exoplanetarium-folder"]?.position || { x: 50, y: 380 }
        }
      />
      <DesktopFolder
        id="farmbandhu-folder"
        name="FarmBandhu"
        icon="/images/folder.png"
        folderType="work"
        projectId={8}
        initialPosition={
          desktopFolders["farmbandhu-folder"]?.position || { x: 50, y: 520 }
        }
      />
      <DesktopFolder
        id="mediscribe-folder"
        name="Mediscribe"
        icon="/images/folder.png"
        folderType="work"
        projectId={9}
        initialPosition={
          desktopFolders["mediscribe-folder"]?.position || { x: 50, y: 660 }
        }
      />

      <WindowManager />
      <Dock />
    </div>
  );
}

export default Home;
