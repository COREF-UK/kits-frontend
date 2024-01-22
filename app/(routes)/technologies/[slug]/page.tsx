import GlossaryTooltips from "@/app/_components/glossaryTooltips";
import ImplementationColumn from "@/app/_components/implementationColumn";
import ImplementationMatrix from "@/app/_components/implementationMatrix";
import ArchitectureDiagram from "@/app/_components/architectureDiagram";
import { initialEdges, initialNodes } from "@/app/_lib/connectivity_architecture";
import { fetchAPI } from "@/app/_lib/api";
import {
  EntityType,
  EntityTypeType,
  TypeMaturityLevels,
  ITechnologyData,
} from "@/app/_lib/types";

export const runtime = "edge";

interface StrapiResponse {
  data: any;
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
      theme: response.data.attributes.theme.data.attributes.name,
      Basic: { description: "", entities: [] },
      Advanced: { description: "", entities: [] },
      "World-Class": { description: "", entities: [] },
      Future: { description: "", entities: [] },
    };

    for (let maturityLevel of response.data.attributes.maturity_levels.data) {
      const maturityLevelResponse = await fetchAPI<StrapiResponse>(
        `/implementation-levels/${maturityLevel.id}`,
        urlParamsObject
      );

      technologyData[
        maturityLevel.attributes.level as TypeMaturityLevels
      ].description = maturityLevelResponse.data.attributes.description;

      EntityType.forEach((entityType: EntityTypeType) => {
        maturityLevelResponse.data.attributes[entityType].data.forEach(
          (entity: any) => {
            technologyData[
              maturityLevel.attributes.level as TypeMaturityLevels
            ].entities.push({
              type: entityType,
              entity: entity,
            });
          }
        );
      });
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
      <main>
        {data.title === "Data Management" && (
          <>
            <ImplementationMatrix technologyData={data}></ImplementationMatrix>
            <ArchitectureDiagram
              initialNodes={initialNodes}
              initialEdges={initialEdges}
            ></ArchitectureDiagram>
          </>
        )}
        {data.title !== "Data Management" && (
          <ImplementationColumn technologyData={data}></ImplementationColumn>
        )}
      </main>
    </div>
  );
}
