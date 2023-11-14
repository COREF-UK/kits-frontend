"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "../_lib/api";
import NavTheme from "./nav_theme";

interface StrapiResponse {
  data: any;
}

async function fetchData() {
  try {
    const apiPath = `/themes`;
    const urlParamsObject = {
      sort: { id: "asc" },
      populate: "*",
    };

    const response = await fetchAPI<StrapiResponse>(apiPath, urlParamsObject);

    return Object.assign(
      {},
      ...response.data.map((theme: any) => ({
        [theme.id]: theme.attributes.technologies.data.map((tech: any) => ({
          id: tech.id,
          name: tech.attributes.name,
        })),
      }))
    );
  } catch (error) {
    console.error(error);
  }
}

export default function SideBar() {
  let [data, setData] = useState<any>(null);
  let [isSideBarOpen, setSidebarState] = useState(false);
  let [isSideBarOpenManually, setSideBarOpenManually] = useState(false);

  let isAnimating = false;

  const changeSideBarState = (newState: boolean) => {
    console.log(isAnimating);
    if (isAnimating) return;
    setSidebarState(newState);
  };

  useEffect(() => {
    fetchData().then((res) => setData(res));
  }, []);

  const navVariants = {
    closed: {
      width: "4rem",
      transition: { delay: 0.5 },
    },
    opened: { width: "20rem" },
  };

  return (
    <motion.nav
      onMouseEnter={() => changeSideBarState(true)}
      onMouseLeave={() => {
        !isSideBarOpenManually && changeSideBarState(false);
      }}
      variants={navVariants}
      animate={isSideBarOpen ? "opened" : "closed"}
      onAnimationStart={() => (isAnimating = true)}
      onAnimationComplete={() => (isAnimating = false)}
      className={`fixed z-40 left-0 top-0  h-screen backdrop-blur-md flex flex-col items-start justify-start py-5 bg-blue-200 bg-opacity-10 outline-blue-100`}
    >
      {/* Kits logo */}
      {isSideBarOpen && (
        <Image
          className="h-16 absolute -top-2 left-6"
          src="/coref-simple-logo.svg"
          width="54"
          height="96"
          alt="Kits"
        ></Image>
      )}
      <motion.div
        animate={
          isSideBarOpen
            ? { rotate: 90, marginLeft: "1.5rem" }
            : { rotate: 0, marginLeft: 0 }
        }
        className="mb-16"
      >
        <Link href="/">
          <Image
            className="w-16 px-5"
            src="/kits-rotated.svg"
            width="54"
            height="96"
            alt="Kits"
          ></Image>
        </Link>
      </motion.div>

      {/* Nav items */}
      <motion.div
        layoutScroll
        className="overflow-y-auto overflow-x-hidden invisible-scrollbar"
        animate={{ width: isSideBarOpen ? "open" : "closed" }}
        variants={navVariants}
      >
        {["connectivity", "operational_technology", "digital_platform"].map(
          (el, i) => (
            <NavTheme
              index={i}
              theme={el}
              isSideBarOpen={isSideBarOpen}
              key={i}
              technologies={data?.[i + 1] ?? []}
            ></NavTheme>
          )
        )}
      </motion.div>

      {/* Open/Close Button */}
      <motion.button
        type="button"
        animate={isSideBarOpen ? { rotate: -180 } : { rotate: 0 }}
        onClick={() => {
          changeSideBarState(!isSideBarOpen);
          setSideBarOpenManually(!isSideBarOpen);
        }}
        className="mt-auto ml-auto"
      >
        <Image
          className="w-full py-4 px-5"
          src="/alt/chevron.svg"
          width="24"
          height="24"
          alt={isSideBarOpen ? "Close" : "Open"}
        ></Image>
      </motion.button>
    </motion.nav>
  );
}
