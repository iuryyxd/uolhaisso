import { getPostBySlug } from "@/app/api/get-post-by-slug";
import { Frame } from "@/components";
import { Separator } from "@/components/ui/separator";
import { convertIsoToFormattedDate } from "@/utils/convertDate";

type Image = {
  footer: string;
  imageUrl: string;
};

export default async function Noticia({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);

  if (!data) {
    return <div>Post não encontrado.</div>;
  }

  const images = JSON.parse(data.images) as Image[];

  return (
    <main className="w-full max-w-[720px] pt-16 pb-8 mx-auto space-y-8">
      <header className="space-y-3">
        <h1 className="text-[2.5rem] leading-tight font-bold text-justify">
          {data.title}
        </h1>
        <p className="text-sm opacity-80 text-justify">{data.description}</p>
        <div className="flex flex-col gap-1">
          <span className="text-sm">
            Por <span className="font-bold text-slate-800">{data.author} </span>
          </span>
          <span className="opacity-80 text-xs">
            {convertIsoToFormattedDate(data.publishedAt)}
          </span>
        </div>
      </header>

      <Separator />

      <p className="text-lg text-justify">{data.headline}</p>

      <ul className="flex flex-col gap-10">
        {images.map((image, i) => (
          <Frame
            footer={image.footer}
            imageUrl={image.imageUrl}
            key={`${image.imageUrl}-${i}`}
          />
        ))}
      </ul>
    </main>
  );
}
