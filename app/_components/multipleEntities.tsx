"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/app/_lib/api";
import ListItem from "@/app/_components/listItem";
import { getStrapiMedia } from "@/app/_lib/media";

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

export default function MultipleEntities({ title, path }: { title: string, path: string }) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);

    try {
      const apiPath = `/${path}`;
      const urlParamsObject = {
        sort: { id: "asc" },
        populate: "*",
        pagination: {
          start: start,
          limit: limit,
        },
      };

      const responseData = await fetchAPI<StrapiResponse>(
        apiPath,
        urlParamsObject
      );

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
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

  //   if (isLoading) return <Loader />;
  console.log(data);

  return (
    <main>
      <h1 className="mt-4 text-center">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8 gap-4 md:gap-8">
        {data.map((entity: any) => (
          <ListItem
            key={entity.id}
            title={entity.attributes.name}
            link={`/${path}/${entity.id}`}
            image={getStrapiMedia(entity.attributes.cover_image)}
          ></ListItem>
        ))}
      </div>
    </main>
  );
}
