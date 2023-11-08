import { fetchAPI } from "@/app/_lib/api";
import ListItem from "@/app/_components/listItem";
import { getStrapiMedia } from "@/app/_lib/media";

interface StrapiResponse {
  data: any;
}

async function fetchData(path: string) {
  try {
    const apiPath = `/${path}`;
    const urlParamsObject = {
      sort: { id: "asc" },
      populate: "*",
    };

    const responseData = await fetchAPI<StrapiResponse>(
      apiPath,
      urlParamsObject
    );

    return responseData.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function MultipleEntities({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const data = await fetchData(path);

  if (data === undefined) return <h1>Error Fetching Data</h1>

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
