import Header from "@/components/Header";
import "./globals.css";
import {Inter} from "next/font/google";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Wity-dalle",
  description: "Made by witty",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          <PromptInput />
        </ClientProvider>

        {children}
      </body>
    </html>
  );
}
