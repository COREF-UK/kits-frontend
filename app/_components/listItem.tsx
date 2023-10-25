import Link from "next/link";
import Image from "next/image";

var GeoPattern = require("geopattern");

interface IListItemsProps {
  title: string;
  link: string;
  image?: string;
}

export default function ListItem(props: IListItemsProps) {
  const pattern = GeoPattern.generate(props.title);
  return (
    <div className="group rounded-lg overflow-clip w-full bg-gradient-to-br from-black to-gray-700 shadow-lg hover:scale-105 transition-transform">
      <Link href={props.link}>
        <Image
          className="w-full aspect-video object-cover group-hover:saturate-150 transition-all overflow-hidden"
          unoptimized
          src={
            props.image ??
            pattern.toDataUrl().substring(5, pattern.toDataUrl().length - 2)
          }
          width={500}
          height={250}
          priority={true}
          alt="Cover Image"
        ></Image>
        <div className="p-4 flex flex-row justify-between items-center shadow-2xl">
          <h3>{props.title}</h3>
          <div className="py-2 px-4 bg-blue-700 rounded-md">View</div>
        </div>
      </Link>
    </div>
  );
}
