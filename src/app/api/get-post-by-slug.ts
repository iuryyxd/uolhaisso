import { db } from "@/lib/prisma";

export async function getPostBySlug(slug: string) {
  return await db.posts.findFirst({
    where: {
      slug,
    },
  });
}
