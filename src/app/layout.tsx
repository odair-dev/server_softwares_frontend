import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/main.scss";
import { GlobalProvider } from "@/providers/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Server Softwares",
  description: "Desafio Server Softwares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
