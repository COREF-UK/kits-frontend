import SingleEntity from "@/app/_components/singleEntity";

export const runtime = 'edge';

export default function Software({ params }: { params: { slug: string } }) {
  return SingleEntity({path: 'softwares', slug: params.slug, displayRelations: []})
}
