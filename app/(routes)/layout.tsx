import "./globals.css";
import { Exo_2 } from "next/font/google";
import { Metadata } from 'next'

import SideBar from "../_components/sidebar";

const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Kits',
    default: 'COREF Kits',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="bg-background text-white">
      <body className={exo2.className + " min-h-screen"}>
        <SideBar></SideBar>
        <div className="ml-16 p-4 md:p-8 h-full">{children}</div>
      </body>
    </html>
  );
}
