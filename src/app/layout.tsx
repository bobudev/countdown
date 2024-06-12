import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";

// either Static metadata
export const metadata: Metadata = {
  title: "Bobu Countdown",
};

const myFont = localFont({
  src: [
    {
      path: "./LevelUp.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Pixter-Display.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
