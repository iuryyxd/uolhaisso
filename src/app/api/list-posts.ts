"use server";

import { db } from "@/lib/prisma";

export async function listPosts() {
  try {
    const posts = await db.posts.findMany();
    return posts;
  } catch (e) {
    console.log(e);
  }

  return [];
}
