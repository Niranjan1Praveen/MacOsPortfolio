import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Niranjan's Portfolio",
  description:
    "A MacOs based portfolio website showcasing Niranjan's projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-macos bg-macos-overlay`}>
        <Toaster position="top-right" richColors closeButton />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
