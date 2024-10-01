import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { inter } from "@/assets/fonts";
import AuthProvider from "@/context/AuthProvider";
import ModalAddRoom from "@/components/Modal/ModalAddRoom";
import AppProvider from "@/context/AppProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Chat App",
    default: "Chat App",
  },
  description: "Project Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-screen`}>
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
