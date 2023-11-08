import SingleEntity from "@/app/_components/singleEntity";

export const runtime = 'edge';

export default function Hardware({ params }: { params: { slug: string } }) {
  return SingleEntity({path: 'hardwares', slug: params.slug, displayRelations: []})
}
