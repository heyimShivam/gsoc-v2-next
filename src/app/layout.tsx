import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@/css/globals.css";
import "@/css/approved-overrides.css";

export const metadata: Metadata = {
  title: "GSoC Hub",
  description: "Explore GSoC organizations and opportunities",
};
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="top-right"
          theme="dark"
          richColors
        />
      </body>
    </html>
  );
}