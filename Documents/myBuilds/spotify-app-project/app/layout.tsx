import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type {Metadata} from "next";
import {Figtree} from "next/font/google";
import SupabaseProvider from "@/providers/supabaseProvider";
import UserProvider from "@/hooks/UserProvidet";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByid from "@/actions/getSongsById";
import Player from "./Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const font = Figtree({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Spotify App",
  description: "By witty",
};
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByid();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
