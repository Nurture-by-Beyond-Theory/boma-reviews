import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/MainLayout";"../components/MainLayout"



export const metadata: Metadata = {
  title: "Next Js Tailwind Sandbox",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}