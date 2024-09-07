import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Codersteps project for Building a File Uploader with Next.js App Router",
  description:
    "Codersteps project for Building a File Uploader with Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <main className="h-full flex items-center justify-center">
          <div className="w-full max-w-xl space-y-5">{children}</div>
        </main>
      </body>
    </html>
  );
}
