"use client";

import DesktopFolder from "./DesktopFolder";
import { useWindowStore } from "@/store/windowStore";

export default function DesktopFolders() {
  const { desktopFolders } = useWindowStore();

  return (
    <>
      <DesktopFolder
        id="echowithin-folder"
        name="EchoWithin"
        icon="/images/folder.png"
        folderType="work"
        projectId={5}
        initialPosition={
          desktopFolders["echowithin-folder"]?.position || {
            x: 50,
            y: 100,
          }
        }
      />
      <DesktopFolder
        id="adversanet-folder"
        name="AdversaNet"
        icon="/images/folder.png"
        folderType="work"
        projectId={6}
        initialPosition={
          desktopFolders["adversanet-folder"]?.position || {
            x: 50,
            y: 240,
          }
        }
      />
      <DesktopFolder
        id="exoplanetarium-folder"
        name="Exoplanetarium"
        icon="/images/folder.png"
        folderType="work"
        projectId={7}
        initialPosition={
          desktopFolders["exoplanetarium-folder"]?.position || {
            x: 50,
            y: 380,
          }
        }
      />
      <DesktopFolder
        id="farmbandhu-folder"
        name="FarmBandhu"
        icon="/images/folder.png"
        folderType="work"
        projectId={8}
        initialPosition={
          desktopFolders["farmbandhu-folder"]?.position || {
            x: 50,
            y: 520,
          }
        }
      />
      <DesktopFolder
        id="mediscribe-folder"
        name="Mediscribe"
        icon="/images/folder.png"
        folderType="work"
        projectId={9}
        initialPosition={
          desktopFolders["mediscribe-folder"]?.position || {
            x: 50,
            y: 660,
          }
        }
      />
      <DesktopFolder
        id="dropconnect-folder"
        name="DropConnect"
        icon="/images/folder.png"
        folderType="work"
        projectId={10}
        initialPosition={
          desktopFolders["dropconnect-folder"]?.position || {
            x: 175,
            y: 100,
          }
        }
      />
      <DesktopFolder
        id="vahaanbandhu-folder"
        name="VahaanBandhu"
        icon="/images/folder.png"
        folderType="work"
        projectId={11}
        initialPosition={
          desktopFolders["vahaanbandhu-folder"]?.position || {
            x: 175,
            y: 240,
          }
        }
      />
    </>
  );
}
