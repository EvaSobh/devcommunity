import Navbar from "@/components/navbar";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevCommunity",
  description: "A developer community platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
