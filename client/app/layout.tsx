import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
