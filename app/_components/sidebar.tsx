'use client';

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";


export default function SideBar() {
    let [isSideBarOpen, setSidebarState] = useState(false);

    return (
      <motion.nav
        animate={{ width: isSideBarOpen ? "18rem" : "4rem" }}
        className={`fixed z-40 left-0 top-0  h-screen backdrop-blur-md flex flex-col items-start justify-start py-5 bg-blue-200 bg-opacity-10  outline-blue-100`}
      >
        <Link href="/" className="mb-16">
          <Image
            className="w-16 px-5"
            src="/kits-rotated.svg"
            width="54"
            height="96"
            alt="Kits"
          ></Image>
        </Link>
        {["connectivity", "operational_technology", "digital_platform"].map(
          (el, i) => (
            <Link href={`/themes/${i + 1}`} key={i} className="group relative">
              <Image
                className="w-full py-4 px-5"
                src={`/alt/${el}.svg`}
                width="24"
                height="24"
                alt={el
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (match) => match.toUpperCase())}
              ></Image>
              <motion.div
                className={`group-hover:block absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap p-4 rounded-e-md ${isSideBarOpen ? "" : "bg-[#13161a] hidden"}`}
              >
                {el
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (match) => match.toUpperCase())}
              </motion.div>
            </Link>
          )
        )}
  
        <button
          type="button"
          onClick={() => setSidebarState(!isSideBarOpen)}
          className=""
        >
          open
        </button>
      </motion.nav>
    );
  }