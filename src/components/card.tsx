import Image from "next/image";

interface CardProps {
  imageUrl: string;
  title: string;
  author: string;
}

export function Card({ imageUrl, title, author }: CardProps) {
  return (
    <div className="relative w-full sm:w-96 h-96 flex items-end pb-8 gap-4 rounded-lg p-4 group overflow-hidden">
      <div className="flex flex-col z-20 text-white">
        <h2 className="w-full lg:w-80 font-bold text-lg">{title}</h2>
        <span className="text-xs opacity-70">
          Por: <span className="font-semibold">{author}</span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-black z-10 rounded-lg"></div>

      <Image
        src={imageUrl}
        alt={title}
        width={0}
        height={0}
        sizes={"100%"}
        className="rounded-md absolute object-cover top-0 left-0 w-full h-full group-hover:scale-105 transition-all duration-300"
      />
    </div>
  );
}
