"use server";

import { db } from "@/lib/prisma";

export async function publishPost(post: {
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
  headline: string;
  images: string;
  slug: string;
}) {
  await db.posts.create({ data: post });
}
