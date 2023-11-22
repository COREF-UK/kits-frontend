"use-client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const listVariants = {
  hidden: {
    height: "0",
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function isPathnameInTheme(
  pathname: string,
  themeId: number,
  technologies: any
) {
  if (pathname === `/themes/${themeId}`) return true;

  return (
    pathname.includes("technologies") &&
    technologies.some(
      (tech: any) => tech.id.toString() === pathname.split("/").pop()
    )
  );
}

export default function NavTheme({
  isSideBarOpen,
  theme,
  index,
  technologies,
}: {
  isSideBarOpen: boolean;
  theme: string;
  index: number;
  technologies: any;
}) {
  const pathname = usePathname();
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Current page indicator */}
      <AnimatePresence>
        {isPathnameInTheme(pathname, index + 1, technologies) && (
          <motion.div
            key={`selected-${theme}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              width: isSideBarOpen ? "18.5rem" : "2.5rem",
            }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute top-3 left-3 h-10 rounded-lg bg-opacity-10 backdrop-blur-sm bg-blue-700 z-50"
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-row items-start justify-start">
        {/* Link */}
        <Link
          href={`/themes/${index + 1}`}
          className="absolute top-2 left-3 z-40"
          title={theme}
        >
          <div
            style={{ width: isSideBarOpen ? "18.5rem" : "2.5rem" }}
            className="h-10"
          ></div>
        </Link>

        {/* Icon */}
        <Image
          className="w-16 h-16 aspect-square py-4 px-5 min-w-min min-h-min max-w-min"
          style={{ height: "4rem" }}
          src={`/alt/${theme}.svg`}
          width="24"
          height="24"
          alt={theme
            .replaceAll("_", " ")
            .replace(/\b\w/g, (match) => match.toUpperCase())}
        ></Image>

        {/* Themes + sub-technologies */}
        <motion.div
          className="whitespace-nowrap py-4 flex flex-row items-start justify-between w-full"
          animate={isSideBarOpen ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="flex flex-col justify-start items-start">
            <div className="mt-1">
              {theme
                .replaceAll("_", " ")
                .replace(/\b\w/g, (match) => match.toUpperCase())}
            </div>
            <AnimatePresence>
              {isExpanded && isSideBarOpen && (
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {technologies.map((tech: any) => (
                    <motion.li
                      key={tech.id}
                      variants={itemVariants}
                      className="mt-2 text-gray-400 first:mt-6"
                      style={
                        pathname === `/technologies/${tech.id}`
                          ? { color: "white" }
                          : {}
                      }
                    >
                      <Link href={`/technologies/${tech.id}`}>{tech.name}</Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            type="button"
            initial={{ rotate: 90 }}
            animate={isExpanded ? { rotate: 270 } : { rotate: 90 }}
            onClick={() => {
              setExpanded(!isExpanded);
            }}
            className="z-50 mr-5 mt-1"
          >
            <Image
              className="w-full"
              src="/alt/chevron.svg"
              width="24"
              height="24"
              alt={isExpanded ? "Close" : "Open"}
            ></Image>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
