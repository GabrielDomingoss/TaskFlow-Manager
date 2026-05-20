import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { Navbar } from "@/modules/common/components/navbar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskflow Manager",
  description: "Gerenciador de tarefas moderno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col pb-12">
        <QueryProvider>
          <Navbar />
          {children}

          <Toaster richColors position="top-right" closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
