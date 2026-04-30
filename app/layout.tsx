import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AppChrome } from "@/components/shared/app-chrome";
import { APP_NAME } from "@/constants/exam";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  icons: {
    icon: "/icon.svg"
  },
  description:
    "A production-ready mock test platform for IBPS SO IT Mains Professional Knowledge preparation."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
