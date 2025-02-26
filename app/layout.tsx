import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "../lib/providers";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ModalProvider } from "@/components/dialogs";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <Toaster />
          <div className="bg-linear-to-b bg-background custom-animate-in">
            <Providers>
              <Header />
              {children}
              {/* <Footer /> */}
              <ModalProvider />
            </Providers>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
