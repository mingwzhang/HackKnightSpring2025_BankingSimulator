import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const ZZZFont = localFont({ src: '../../public/fonts/印品鸿蒙体.ttf'})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "lowercase two",
  description: "Bank teller simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ZZZFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
