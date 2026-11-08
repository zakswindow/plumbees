import { postsA } from "./posts-a";
import { postsB } from "./posts-b";
import { postsC } from "./posts-c";
import { postsD } from "./posts-d";
import type { Post } from "./types";

const all: Post[] = [...postsA, ...postsB, ...postsC, ...postsD];

/** Posts dated in the future are hidden until a rebuild on or after their date. */
export function getPosts(now = new Date()): Post[] {
  return all
    .filter((p) => new Date(p.date) <= now)
    .sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function readingMinutes(post: Post): number {
  const words = post.blocks
    .map((b) => (b.t === "ul" || b.t === "ol" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
