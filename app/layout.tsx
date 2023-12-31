import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "../lib/providers";

import { Toaster } from "react-hot-toast";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TP Toolkit",
  description: "Reverse geo-coder and other geographical tools for the Garden State Parkway and New Jersey Turnpike",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <div className='bg-gradient-to-b bg-shark-50 dark:bg-shark-900'>
          <Providers>
            <Header />
            {children}
            {/* <Footer /> */}
            <Toaster position="bottom-right"/>
          </Providers>
        </div>
      </body>
    </html>
  );
}
