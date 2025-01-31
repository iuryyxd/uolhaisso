import { unstable_noStore as noStore } from "next/cache";
import { listPosts } from "@/app/api/list-posts";
import { Card } from "@/components";
import Link from "next/link";

export default async function Home() {
  noStore();
  const posts = await listPosts();

  if (!posts) {
    return <div>Não há posts</div>;
  }

  return (
    <main className="flex-1 px-4 lg:px-0">
      <h1 className="text-3xl text-center font-bold pt-8">Últimos artigos</h1>
      <div className="w-full lg:max-w-[1024px] px-4 lg:px-0 py-8 mx-auto flex flex-wrap sm:justify-center gap-8">
        {posts.map((post) => {
          const image = JSON.parse(post.images)[0];
          if (image) {
            return (
              <Link
                href={`/noticia/${post.slug}`}
                key={post.id}
                className="w-full md:w-auto"
              >
                <Card
                  key={post.id}
                  author={post.author}
                  imageUrl={image.imageUrl}
                  title={post.title}
                />
              </Link>
            );
          }
        })}
      </div>
    </main>
  );
}
