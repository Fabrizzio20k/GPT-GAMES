import type { Metadata } from "next";
import ReduxProvider from "@/redux/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPT Games",
  description: "GPT Games official store",
  icons: {
    icon: "/icons/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gulf-blue-950">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
