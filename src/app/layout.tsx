import Providers from "@/components/Providers";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "ProjectFlow",
  description: "created by abdellah chehri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
