import ImplementationMatrix from "@/app/_components/implementationMatrix";
import { fetchAPI } from "@/app/_lib/api";

export const runtime = "edge";

interface StrapiResponse {
  data: any;
}

export const EntityType = [
  "hardwares",
  "softwares",
  "infrastructures",
  "skills",
] as const;
export type IEntityType = (typeof EntityType)[number];
export const MaturityLevels = [
  "Basic",
  "Advanced",
  "World-Class",
  "Future",
] as const;
export type IMaturityLevel = (typeof MaturityLevels)[number];

export interface ITechnologyEntity {
  entity: any;
  type: IEntityType;
}

export interface ITechnologyData {
  title: string;
  description: string;
  Basic: ITechnologyEntity[];
  Advanced: ITechnologyEntity[];
  "World-Class": ITechnologyEntity[];
  Future: ITechnologyEntity[];
}

async function fetchData(slug: string) {
  try {
    const apiPath = `/technologies/${slug}`;
    const urlParamsObject = {
      sort: { id: "asc" },
      populate: "*",
    };

    const response = await fetchAPI<StrapiResponse>(apiPath, urlParamsObject);

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

      EntityType.forEach(
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

    return technologyData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data: ITechnologyData | undefined = await fetchData(params.slug);

  if (data === undefined) return <h1>Error Retrieving Technology</h1>;
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <main>
        <ImplementationMatrix technologyData={data}></ImplementationMatrix>
      </main>
    </div>
  );
}
