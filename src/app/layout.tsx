import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/main.scss";
import { GlobalProvider } from "@/providers/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer position="bottom-right" autoClose={2000} />
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
