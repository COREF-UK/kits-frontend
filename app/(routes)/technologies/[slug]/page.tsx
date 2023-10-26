"use client";
import { fetchAPI } from "@/app/_lib/api";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

interface StrapiResponse {
  data: any;
  meta: Meta;
}

type IEntityType = "hardware" | "software" | "infrastructure" | "skills";
type IMaturityLevel = "Basic" | "Advanced" | "World-Class" | "Future";

enum EntityType {
  hardware,
  software,
  infrastructure,
  skills,
}

interface ITechnologyEntity {
  entity: object;
  type: IEntityType;
}

interface ITechnologyData {
  title: string;
  description: string;
  Basic: ITechnologyEntity[];
  Advanced: ITechnologyEntity[];
  "World-Class": ITechnologyEntity[];
  Future: ITechnologyEntity[];
}


function Cell(title: string, entityType: string, link: string) {
  if (entityType === "yellow") {
    return (
      <div className="w-full text-center text-xs font-extralight px-3 py-2 my-2 bg-[#E5E92A] text-black rounded-lg flex flex-row justify-center items-center gap-1">
        <Image
          className="h-2 -rotate-90"
          src="/alt/arrow.svg"
          alt=""
          width={20}
          height={20}
        ></Image>
        {title}
      </div>
    );
  }

  const colorClass: string = entityType.slice(0, -1) + "-cell";

  return (
    <Link href={link}>
      <div
        className={`w-full text-center text-xs font-extralight rounded-lg px-3 py-2 my-2 ${colorClass}`}
      >
        {title}
      </div>
    </Link>
  );
}

export default function Technology({ params }: { params: { slug: string } }) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<ITechnologyData>();
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const apiPath = `/technologies/${params.slug}`;
      const urlParamsObject = {
        sort: { id: "asc" },
        populate: "*",
        pagination: {
          start: 0,
          limit: 1,
        },
      };

      const response = await fetchAPI<StrapiResponse>(apiPath, urlParamsObject);

      // setData(response.data);
      const technologyData: ITechnologyData = {
        title: response.data.attributes.name,
        description: response.data.attributes.description,
        Basic: [],
        Advanced: [],
        "World-Class": [],
        Future: [],
      };

      for (let maturityLevel of response.data.attributes.maturity_levels.data) {
        const maturityLevelResponse = await fetchAPI<StrapiResponse>(
          `/implementation-levels/${maturityLevel.id}`,
          urlParamsObject
        );

        ["hardwares", "softwares", "infrastructures", "skills"].forEach(
          (entityType) => {
            maturityLevelResponse.data.attributes[entityType].data.forEach(
              (entity: any) => {
                technologyData[
                  maturityLevel.attributes.level as IMaturityLevel
                ].push({
                  type: entityType as IEntityType,
                  entity: entity,
                });
              }
            );
          }
        );
      }

      console.log(technologyData);
      setData(technologyData);

      // setMeta(response.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && data && (
        <div>
          <header className="w-full grid grid-cols-4 text-xl text-center font-bold mb-6 pl-[4.5rem] sticky top-32">
            {["hardware", "software", "infrastructure", "skills"].map(
              (heading) => (
                <div
                  className="flex flex-row justify-center items-center gap-3"
                  key={heading}
                >
                  <Image
                    className="h-4"
                    src={`/alt/${heading}.svg`}
                    alt=""
                    width={20}
                    height={20}
                  ></Image>
                  {heading[0].toUpperCase() + heading.slice(1)}
                </div>
              )
            )}
          </header>
          {["Future", "World-Class", "Advanced", "Basic"].map(
            (level: string) => (
              <div key={level}>
                <hr className="opacity-60" />
                <section className="flex flex-row flex-nowrap py-4">
                  <div className="text-lg font-thin vertical-text rotate-180 w-10 mr-8 self-center">
                    {level}
                  </div>
                  <div className="w-full">
                    <div className="w-full grid grid-cols-4 gap-4">
                      {[
                        "hardwares",
                        "softwares",
                        "infrastructures",
                        "skills",
                      ].map((entityType) => (
                        <div className="flex flex-col h-full" key={entityType}>
                          {data[level as IMaturityLevel]
                            .filter((el: any) => el.type === entityType)
                            .filter(
                              (el: any) =>
                                el.entity.attributes.name !== "Everything Below"
                            )
                            .map((entity: any) =>
                              Cell(
                                entity.entity.attributes.name,
                                entityType,
                                `/${entityType}/${entity.entity.id}`
                              )
                            )}
                        </div>
                      ))}
                    </div>
                    <hr className="border-dotted opacity-0 my-2" />
                    <div className="w-full grid grid-cols-4 gap-4">
                      {[
                        "hardwares",
                        "softwares",
                        "infrastructures",
                        "skills",
                      ].map((entityType) => (
                        <div className="flex flex-col h-full" key={entityType}>
                          {data[level as IMaturityLevel]
                            .filter((el: any) => el.type === entityType)
                            .filter(
                              (el: any) =>
                                el.entity.attributes.name === "Everything Below"
                            )
                            .map((entity: any) =>
                              Cell(entity.entity.attributes.name, "yellow", "#")
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )
          )}
          <hr className="opacity-60" />
        </div>
      )}
    </main>
  );
}
