"use-client";
import SingleEntity from "@/app/_components/singleEntity";

export default function Theme({ params }: { params: { slug: string } }) {
  return (
    <SingleEntity
      path="themes"
      slug={params.slug}
      displayRelations={["technologies"]}
    ></SingleEntity>
  );
}
