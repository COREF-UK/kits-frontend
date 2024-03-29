import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Button from "../_components/button";

export const metadata: Metadata = {
  title: 'Home'
}

export default function Page() {
  return (
    <div className="w-full text-center h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 flex flex-col justify-center items-center gap-10 mt-10">
        <Image
          className="w-1/2"
          src="/coref-kits-logo.svg"
          width="2706"
          height="1080"
          alt="COREF"
        ></Image>
        {/* <Link href="/themes"> */}
        <Button title="EXPLORE"></Button>
        {/* </Link> */}
      </div>

      <Image
        className="fixed h-screen w-screen top-0 left-0 -z-30 background-image"
        src="/home-background.svg"
        height="1000"
        width="1000"
        alt="background"
      ></Image>
    </div>
  );
}
