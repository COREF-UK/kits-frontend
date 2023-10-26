"use client";

import "./globals.css";
import { Exo_2 } from "next/font/google";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Background } from "../_components/background";
import { Head } from "next/document";

const exo2 = Exo_2({ subsets: ["latin"] });

function NavLink({ title }: { title: string }) {
  const pathname = usePathname();

  return (
    <li
      className={`${
        pathname === (title === "Home" ? "/" : `/${title.toLowerCase()}`)
          ? ""
          : "opacity-70"
      } hover:opacity-100 transition-opacity`}
    >
      <Link href={title === "Home" ? "/" : `/${title.toLowerCase()}`}>
        {title}
      </Link>
    </li>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <html lang="en" className="bg-background text-white">
      <Head>
        <link rel="shortcut icon" href="favicon.png" />
        <title>COREF | Kits</title>
      </Head>
      <body className={exo2.className + " min-h-screen"}>
        {pathName !== "/" && <Background></Background>}
        <nav className="sticky top-0 flex flex-row justify-between items-center p-4 md:p-8 z-30 backdrop-blur-sm">
          <Link className="flex flex-row justify-center items-center" href="/">
            <Image
              className="h-fit hidden md:block"
              src="/coref-o.svg"
              width="54"
              height="54"
              alt="COREF"
            ></Image>
            <div className="h-[35px] w-[2px] bg-white opacity-50 ml-1 mr-4 hidden md:block"></div>
            <Image
              className="h-fit"
              src="/kits.svg"
              width="96"
              height="54"
              alt="COREF"
            ></Image>
          </Link>
          <ul className="flex flex-row gap-6 font-bold">
            <NavLink title="Home"></NavLink>
            <NavLink title="Themes"></NavLink>
          </ul>
        </nav>
        <div className="p-4 md:p-8 h-full">{children}</div>
      </body>
    </html>
  );
}
