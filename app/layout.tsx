import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "../lib/providers";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ModalProvider } from "@/components/dialogs";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TP Toolkit",
  description:
    "Reverse geo-coder and other geographical tools for the Garden State Parkway and New Jersey Turnpike",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Toaster />
        <Analytics />
        <div className="bg-linear-to-b bg-zinc-50 dark:bg-zinc-900 custom-animate-in">
          <Providers>
            <Header />
            {children}
            {/* <Footer /> */}
            <ModalProvider />
          </Providers>
        </div>
      </body>
    </html>
  );
}
