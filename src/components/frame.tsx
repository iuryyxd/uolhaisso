import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

interface FrameProps {
  imageUrl: string;
  footer: string;
}

export function Frame({ imageUrl, footer }: FrameProps) {
  return (
    <div className="space-y-2">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src={imageUrl}
          alt={footer}
          width={720}
          height={405}
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
      <p className="text-xs opacity-80 text-justify">{footer}</p>
    </div>
  );
}
