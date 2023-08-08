import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full text-center h-full">
      <h1>COREF Kits</h1>
      <div className="h-40 relative flex flex-row justify-center items-center">
        <Image
          className="h-full"
          src="/coref-simple-logo.svg"
          width="218"
          height="87"
          alt="COREF"
        ></Image>
        <Image
          className="h-full"
          src="/kits-logo.svg"
          width="1920"
          height="1080"
          alt="COREF"
        ></Image>
        <Image
          className="h-full"
          src="/Mediamodifier-Design.svg"
          width="1920"
          height="1080"
          alt="COREF"
        ></Image>
      </div>
    </div>
  );
}
