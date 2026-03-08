"use client";

import { useTheme } from "next-themes";

interface ResumeWindowProps {
  data?: any;
}

export default function ResumeWindow({ data }: ResumeWindowProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleDownload = () => {
    const pdfUrl = "/files/resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Niranjan_Praveen_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full">
      {/* PDF Preview using object tag */}
      <div className="flex-1 overflow-y-auto p-4">
        <object
          data="/resume.pdf#view=FitH"
          type="application/pdf"
          className="w-full h-full rounded-lg border-0"
        >
          <div className={`flex flex-col items-center justify-center h-full p-8 text-center ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            <p>Unable to display PDF preview.</p>
            <button
              onClick={handleDownload}
              className={`mt-4 px-4 py-2 rounded-md text-sm ${
                isDark 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Download to view
            </button>
          </div>
        </object>
      </div>
    </div>
  );
}