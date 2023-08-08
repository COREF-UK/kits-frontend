"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "@/app/_lib/api";
import Image from "next/image";
import { getStrapiMedia } from "@/app/_lib/media";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Theme({ params }: { params: { slug: string } }) {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);

    try {
      // console.log(params)
      const path = "/themes/" + params.slug;
      const urlParamsObject = {
        sort: { id: "asc" },
        populate: "*",
        pagination: {
          start: start,
          limit: limit,
        },
      };

      const responseData = await fetchAPI(path, urlParamsObject);

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

  return (
    <main>
      <h1>{data.attributes.title}</h1>
      <p className="opacity-60 leading-5 mt-2 max-w-2xl">
        {data.attributes.description}
      </p>
      <Image
        className="w-full"
        src={getStrapiMedia(data.attributes.cover_image) ?? "/vercel.svg"}
        width={1500}
        height={750}
        priority={true}
        alt="Cover Image"
      ></Image>
    </main>
  );
}
