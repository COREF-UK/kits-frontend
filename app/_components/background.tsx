'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Background() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log('here')
    };

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen -z-50 rotate-[${scrollY}deg] transition-transform`}>
      <Image
        className="absolute top-0 right-0 w-1/2"
        src="/alt/background-vector-1.svg"
        alt=""
        width={1321}
        height={1546}
      ></Image>
      <Image
        className="absolute bottom-0 left-0 w-1/2 scale-150"
        src="/alt/background-vector-2.svg"
        alt=""
        width={1806}
        height={1700}
      ></Image>
    </div>
  );
}
