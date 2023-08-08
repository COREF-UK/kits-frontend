import Link from "next/link";
import Image from "next/image";

interface IListItemsProps {
  title: string;
  link: string;
  image?: string;
}

export default function ListItem(props: IListItemsProps) {
  console.log(props.image);
  return (
    <div className="rounded-lg overflow-clip w-full bg-gradient-to-tl from-black to-gray-600 shadow-lg hover:scale-105 transition-transform">
      <Image
        className="w-full"
        src={props.image ?? "/vercel.svg"}
        width={500}
        height={250}
        priority={true}
        alt="Cover Image"
      ></Image>
      <div className="p-4 flex flex-row justify-between items-center shadow-2xl">
        <h3>{props.title}</h3>
        <Link className="py-2 px-4 bg-blue-700 rounded-md" href={props.link}>
          View
        </Link>
      </div>
    </div>
  );
}
