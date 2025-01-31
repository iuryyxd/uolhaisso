import Image from "next/image";

interface FrameProps {
  imageUrl: string;
  footer: string;
}

export function Frame({ imageUrl, footer }: FrameProps) {
  return (
    <div className="space-y-2">
      <Image
        src={imageUrl}
        alt={footer}
        width={0}
        height={0}
        sizes="100%"
        className="h-auto w-full md:max-w-[720px] md:h-auto rounded-md object-cover"
      />
      <p className="text-xs opacity-80 text-justify">{footer}</p>
    </div>
  );
}
