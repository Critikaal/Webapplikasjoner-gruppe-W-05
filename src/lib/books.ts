import { z } from "zod";

const VolumeSchema = z.object({
  id: z.string(),
  volumeInfo: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    averageRating: z.number().optional(),
    imageLinks: z.object({ thumbnail: z.string().optional() }).optional(),
  }),
});
const ResponseSchema = z.object({ items: z.array(VolumeSchema).default([]) });

export type Book = {
  id: string;
  title: string;
  authors: string[];
  rating?: number;
  cover?: string;
};

export async function searchBooks(
  query: string,
  apiKey?: string,
  maxResults = 15,
  startIndex = 0,
): Promise<Book[]> {
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.set("q", query);
  // Google tillater høyst 40 per forespørsel.
  url.searchParams.set("maxResults", String(Math.min(maxResults, 40)));
  url.searchParams.set("startIndex", String(startIndex));
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url);
  if (!res.ok) return [];

  const parsed = ResponseSchema.safeParse(await res.json());
  if (!parsed.success) return [];

  return parsed.data.items.map(({ id, volumeInfo: v }) => ({
    id,
    title: v.title,
    authors: v.authors ?? [],
    rating: v.averageRating,
    cover: v.imageLinks?.thumbnail?.replace("http://", "https://"),
  }));
}