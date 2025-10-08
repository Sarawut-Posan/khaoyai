import type { Metadata } from "next";
import { Kanit, Sarabun } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["600", "700"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khao Yai Getaway - 14 Friends, 2D1N",
  description: "ทริปเขาใหญ่ 2 วัน 1 คืน กับเพื่อน 14 คน ที่ DN Poolvilla Khaoyai",
  keywords: "Khao Yai, team trip, DN Poolvilla, เขาใหญ่",
  openGraph: {
    title: "Khao Yai Getaway - 14 Friends, 2D1N",
    description: "ทริปเขาใหญ่ 2 วัน 1 คืน กับเพื่อน 14 คน",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${kanit.variable} ${sarabun.variable} font-sarabun antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
