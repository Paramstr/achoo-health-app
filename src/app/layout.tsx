import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { customFont } from "./fonts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Achoo",
  description: "Getting sick doesn't have to suck.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`$ ${customFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}