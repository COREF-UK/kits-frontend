import SingleEntity from "@/app/_components/singleEntity";

export const runtime = 'edge';

export default function Skill({ params }: { params: { slug: string } }) {
  return SingleEntity({path: 'skills', slug: params.slug, displayRelations: []})
}
