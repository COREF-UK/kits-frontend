import { fetchAPI } from "@/app/_lib/api";
import Image from "next/image";
import { getStrapiMedia } from "@/app/_lib/media";
import ListItem from "./listItem";
import Markdown from "./markdown";

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

async function fetchData(path: string, slug: string) {
  try {
    const apiPath = `/${path}/${slug}`;
    const urlParamsObject = {
      sort: { id: "asc" },
      populate: "*",
    };

    const response = await fetchAPI<StrapiResponse>(apiPath, urlParamsObject);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function SingleEntity({
  slug,
  path,
  displayRelations,
}: {
  slug: string;
  path: string;
  displayRelations: string[];
}) {
  const data = await fetchData(path, slug);
  const pattern = GeoPattern.generate(data?.attributes?.name);

  if (data === undefined) return <h1>Error Fetching Data</h1>;

  return (
    <div>
      <main>
        <section className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-28">
          <div>
            <h1 className="mb-2">{data.attributes.name}</h1>
            <Markdown source={data.attributes.description}></Markdown>
          </div>

          <Image
            className="w-full lg:max-w-xl rounded-lg lg:rounded-l-lg max-w-3xl aspect-video object-cover lg:-mr-8"
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
    </div>
  );
}
