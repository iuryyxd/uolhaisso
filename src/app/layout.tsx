import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "UoLha Isso",
  description:
    "Uolha Isso é um portal de notícias comprometido em trazer informação de qualidade, com cobertura ampla e imparcial dos principais acontecimentos no Brasil e no mundo. Nosso objetivo é manter você atualizado com agilidade e precisão, oferecendo uma experiência informativa e confiável.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${openSans.className} antialiased min-h-screen flex flex-col`}
      >
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
