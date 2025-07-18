import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeFi Rates - Interest Rate Aggregator",
  description:
    "Compare lending and borrowing rates across multiple DeFi protocols",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
