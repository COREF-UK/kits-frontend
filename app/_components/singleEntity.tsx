"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/app/_lib/api";
import Image from "next/image";
import { getStrapiMedia } from "@/app/_lib/media";
import ListItem from "./listItem";

var GeoPattern = require("geopattern");

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

export default function SingleEntity({
  slug,
  path,
  displayRelations,
}: {
  slug: string;
  path: string;
  displayRelations: string[];
}) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);

    try {
      const apiPath = `/${path}/${slug}`;
      const urlParamsObject = {
        sort: { id: "asc" },
        populate: "*",
        pagination: {
          start: start,
          limit: limit,
        },
      };

      const response = await fetchAPI<StrapiResponse>(apiPath, urlParamsObject);

      if (start === 0) {
        console.log(response.data);
        setData(response.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...response.data]);
      }

      setMeta(response.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  const pattern = GeoPattern.generate(data?.attributes?.name);

  return (
    <div>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && (
        <main>
          <section className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-28">
            <div>
              <h1>{data.attributes.name}</h1>
              <p className="opacity-60 leading-5 my-2 max-w-5xl">
                {data.attributes.description}
              </p>
            </div>

            <Image
              className="w-full rounded-l-lg max-w-3xl aspect-video object-cover lg:-mr-8"
              src={
                getStrapiMedia(data.attributes.cover_image) ??
                pattern.toDataUrl().substring(5, pattern.toDataUrl().length - 2)
              }
              width={1500}
              height={750}
              priority={true}
              alt="Cover Image"
            ></Image>
          </section>

          {displayRelations.map((relation) => (
            <section className="mt-8" key={relation}>
              <h2 className="text-xl font-bold">
                {relation.charAt(0).toUpperCase() + relation.slice(1)}
              </h2>
              <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap -mx-4 md:-mx-8 py-4 pl-4 md:pl-8 invisible-scrollbar">
                {data.attributes[relation].data.map((relationItem: any) => (
                  <div
                    className="inline-block max-w-[80vw] w-[400px] mr-4"
                    key={relationItem.id}
                  >
                    <ListItem
                      title={relationItem.attributes.name}
                      link={`/${relation}/${relationItem.id}`}
                    ></ListItem>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}
