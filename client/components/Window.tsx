"use client";

import BaseWindow from "./windows/BaseWindow";
import SafariWindow from "./windows/SafariWindow";
import PhotosWindow from "./windows/PhotosWindow";
import TerminalWindow from "./windows/TerminalWindow";
import ContactWindow from "./windows/ContactWindow";
import FinderWindow from "./windows/FinderWindow";
import ResumeWindow from "./windows/ResumeWindow";
import TxtFileWindow from "./windows/TxtFileWindow";
import ImgFileWindow from "./windows/ImgFileWindow";

interface WindowProps {
  id: string;
  title: string;
  type: string;
  data?: any;
}

export default function Window({ id, title, type, data }: WindowProps) {
  const renderContent = () => {
    switch (type) {
      case "safari":
        return <SafariWindow data={data} />;
      case "photos":
        return <PhotosWindow data={data} />;
      case "terminal":
        return <TerminalWindow data={data} />;
      case "contact":
        return <ContactWindow data={data} />;
      case "finder":
        return <FinderWindow data={data} />;
      case "resume":
        return <ResumeWindow />;
      case "txtfile":
        return <TxtFileWindow data={data} />;
      case "imgfile":
        return <ImgFileWindow data={data} />;
      default:
        return <div className="p-4">Content for {type}</div>;
    }
  };

  return (
    <BaseWindow id={id} title={title}>
      {renderContent()}
    </BaseWindow>
  );
}