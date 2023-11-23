import SingleEntity from "@/app/_components/singleEntity";

export const runtime = 'edge';

export default function Infrastructure({ params }: { params: { slug: string } }) {
  return SingleEntity({path: 'infrastructures', slug: params.slug, displayRelations: []})
}
