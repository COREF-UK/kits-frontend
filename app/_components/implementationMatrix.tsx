"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import {
  EntityType,
  ICellIdentifier,
  EntityTypeType,
  TypeMaturityLevels,
  ITechnologyData,
  MaturityLevels,
} from "../_lib/types";
import Markdown from "./markdown";

const maturityVariants: Variants = {
  true: {
    filter: "brightness(1.1)",
    fontWeight: "400",
    scale: -1,
  },
  false: {
    filter: "brightness(0.2)",
    fontWeight: "100",
    scale: -0.92,
  },
  default: {
    filter: "brightness(1)",
    fontWeight: "100",
    scale: [-1, -0.92, -1],
    transition: { repeat: Infinity, duration: 2, repeatType: "mirror" },
  },
};

export default function ImplementationMatrix({
  technologyData,
}: {
  technologyData: ITechnologyData;
}) {
  const [fixedMaturity, setFixedMaturity] = useState<TypeMaturityLevels | null>(
    null
  );
  const [cellsToHighlight, setCellsToHighlight] = useState<
    ICellIdentifier[] | null
  >(null);

  const [expandAll, setExpandAll] = useState<boolean>(false);

  const returnCellsUnder = (
    levelToSearch: TypeMaturityLevels,
    entityType: EntityTypeType
  ): ICellIdentifier[] => {
    const filteredCells = technologyData[levelToSearch].entities.filter(
      (cell) => cell.type == entityType
    );

    let cells = filteredCells.map((cell) => ({
      id: cell.entity.id,
      entityType: cell.type,
      maturityLevel: levelToSearch,
    }));

    if (
      filteredCells.some(
        (cell) => cell.entity.attributes.name === "Everything Below"
      )
    ) {
      if (levelToSearch !== "Basic") {
        const newLevel =
          MaturityLevels[MaturityLevels.indexOf(levelToSearch) - 1];
        cells = [...cells, ...returnCellsUnder(newLevel, entityType)];
      }
    }
    return cells;
  };

  const highlightMaturity = (maturity: TypeMaturityLevels) => {
    if (fixedMaturity) maturity = fixedMaturity;

    let newCells: ICellIdentifier[] = [];
    EntityType.forEach((entity) => {
      newCells = [...newCells, ...returnCellsUnder(maturity, entity)];
    });
    setCellsToHighlight(newCells);
  };

  useEffect(() => {
    fixedMaturity === null
      ? setCellsToHighlight(null)
      : highlightMaturity(fixedMaturity);
  }, [fixedMaturity]);

  return (
    <div className="mt-4">
      <div className="opacity-50">
        <Markdown source={technologyData.description}></Markdown>
      </div>
      <div className="mt-10 relative">
        <button
          type="button"
          onClick={() => setExpandAll(!expandAll)}
          className="absolute left-2 -top-4 z-40 font-bold text-5xl"
        >
          {expandAll ? "-" : "+"}
        </button>
        <header className="w-full grid grid-cols-4 text-xl text-center font-bold mb-6 pl-[4.5rem] sticky top-6 z-30">
          {EntityType.map((heading) => (
            <div
              className="flex flex-row justify-center items-center gap-3 text-shadow shadow-black"
              key={heading}
            >
              <Image
                className="h-4"
                src={`/alt/${heading}.svg`}
                alt=""
                width={20}
                height={20}
              ></Image>
              {heading[0].toUpperCase() +
                heading.slice(1, -1) +
                (heading.includes("skills") ? "s" : "")}
            </div>
          ))}
        </header>
        {MaturityLevels.slice()
          .reverse()
          .map((level) => (
            <div key={level}>
              <hr className="opacity-30" />
              <motion.section
                className="flex flex-row flex-nowrap py-4"
                // onMouseEnter={() => highlightMaturity(level)}
                // onMouseLeave={() => !fixedMaturity && setCellsToHighlight(null)}
                onClick={async () => {
                  if (fixedMaturity === level) {
                    setFixedMaturity(null);
                  } else {
                    setFixedMaturity(level);
                  }
                }}
              >
                <motion.div
                  className="text-lg font-thin vertical-text rotate-180 w-10 mr-8 self-center cursor-pointer"
                  animate={
                    cellsToHighlight === null
                      ? "default"
                      : (cellsToHighlight[0].maturityLevel === level).toString()
                  }
                  variants={maturityVariants}
                >
                  {level}
                </motion.div>
                <div className="w-full">
                  {[false, true].map((belowFilter) => (
                    <div
                      className="w-full grid grid-cols-4 gap-4 first:mb-2"
                      key={belowFilter.toString()}
                    >
                      {EntityType.map((entityType: EntityTypeType) => (
                        <div className="flex flex-col h-full" key={entityType}>
                          {technologyData[level as TypeMaturityLevels].entities
                            .filter((el: any) => el.type === entityType)
                            .filter((el: any) =>
                              belowFilter
                                ? el.entity.attributes.name ===
                                  "Everything Below"
                                : el.entity.attributes.name !==
                                  "Everything Below"
                            )
                            .map((entity: any) => (
                              <Cell
                                key={entity.entity.id}
                                entityType={entityType}
                                entity={entity.entity}
                                clickParent={expandAll}
                                highlighted={
                                  cellsToHighlight
                                    ?.some(
                                      (cell) =>
                                        cell.entityType === entityType &&
                                        cell.id === entity.entity.id &&
                                        cell.maturityLevel === level
                                    )
                                    .toString() ?? null
                                }
                              ></Cell>
                            ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          ))}
        <hr className="opacity-30" />
      </div>
    </div>
  );
}

const cellVariants: Variants = {
  true: (i) => ({
    filter: "brightness(1)",
    scale: 1,
    y: -5,
    transition: {
      delay: i * 0.05,
    },
  }),
  false: (i) => ({
    filter: "brightness(0.2)",
    scale: 0.9,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  default: (i) => ({
    filter: "brightness(1)",
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
  open: {
    boxShadow: "0px 10px 20px 10px rgba(0,0,0,1);",
  },
  closed: {
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0);",
  },
};

function Cell({
  entity,
  entityType,
  clickParent,
  highlighted,
}: {
  entity: any;
  entityType: EntityTypeType;
  clickParent: boolean;
  highlighted: string | null;
}) {
  const [clicked, setClicked] = useState<boolean>(clickParent);

  useEffect(() => setClicked(clickParent), [clickParent]);

  if (entity.attributes.name === "Everything Below") {
    return (
      <motion.div
        className="mx-auto w-fit sq text-center text-xs font-extralight px-3 py-2 my-2 bg-black bg-opacity-50 backdrop-blur-md text-white rounded-full flex flex-row justify-center items-center gap-1"
        animate={highlighted ?? "default"}
        variants={cellVariants}
        custom={EntityType.indexOf(entityType as EntityTypeType)}
      >
        <Image
          className="h-2 -rotate-90"
          src="/alt/arrow.svg"
          alt=""
          width={20}
          height={20}
        ></Image>
      </motion.div>
    );
  }

  const colorClass: string = entityType.slice(0, -1) + "-cell";

  const descriptionVariants: Variants = {
    open: {
      height: "auto",
      opacity: 1,
    },
    closed: {
      height: 0,
      opacity: 0,
    },
  };

  return (
    <motion.button
      type="button"
      animate={[highlighted ?? "default", clicked ? "open" : "closed"]}
      variants={cellVariants}
      custom={EntityType.indexOf(entityType as EntityTypeType)}
      className={`w-full text-center text-xs font-light rounded-lg px-3 py-2 my-2 ${colorClass}`}
      onClick={(e) => {
        if (highlighted === "true" || highlighted === null) {
          e.stopPropagation();
          setClicked(!clicked);
        }
      }}
    >
      {entity.attributes.name}
      <AnimatePresence>
        {clicked && (
          <motion.p
            animate={clicked ? "open" : "closed"}
            initial="closed"
            variants={descriptionVariants}
            exit="closed"
            className="text-left overflow-clip"
          >
            <br />
            <Markdown size="sm" source={entity.attributes.synopsis}></Markdown>
            <br />
            <Link
              onClick={(e) => e.stopPropagation()}
              className="block ml-auto underline text-white text-center"
              href={`/${entityType}/${entity.id}`}
            >
              More Details
            </Link>
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
