import type { Metadata } from "next";
import "@/css/globals.css";
import "@/css/approved-overrides.css"

export const metadata: Metadata = {
  title: "GSoC Hub | Find your open-source fit",
  description: "A polished GSoC organization and project discovery experience.",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
