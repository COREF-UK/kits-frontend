"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "../_lib/api";
import NavTheme from "./nav_theme";
import { SideBarToggle } from "./sideBarToggle";

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
    open: { width: "20rem" },
  };

  return (
    <motion.nav
      onMouseEnter={() => changeSideBarState(true)}
      onMouseLeave={() => !isSideBarOpenManually && changeSideBarState(false)}
      variants={navVariants}
      initial="closed"
      animate={isSideBarOpen ? "open" : "closed"}
      onAnimationStart={() => (isAnimating = true)}
      onAnimationComplete={() => (isAnimating = false)}
      className={`fixed z-50 left-0 top-0  h-screen backdrop-blur-md flex flex-col items-start justify-start py-5 bg-blue-200 bg-opacity-10 outline-blue-100`}
    >
      {/* Kits logo */}
      {isSideBarOpen && (
        <motion.div>
          <Image
            className="h-16 absolute -top-2 left-6"
            src="/coref-simple-logo.svg"
            width="54"
            height="96"
            alt="Kits"
          ></Image>
        </motion.div>
      )}
      <motion.div
        variants={{
          open: { rotate: 90, marginLeft: "1.5rem" },
          closed: { rotate: 0, marginLeft: 0 },
        }}
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
      <div className="mt-auto ml-auto mb-2 mr-5">
        <SideBarToggle
          toggle={() => changeSideBarState(!isSideBarOpen)}
        ></SideBarToggle>
      </div>
    </motion.nav>
  );
}
