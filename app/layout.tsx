import "@/app/globals.css";
import { AppStoreProvider } from "@/lib/store-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Timbu',
    default: 'Timbu', // a default is required when creating a template
  },
  description: "Timbu eccomerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppStoreProvider>
      <html lang="en">
        <body className={`${inter.className} stack min-h-screen`}>
          {children}
          <Toaster />
        </body>
      </html>
    </AppStoreProvider>
  );
}
