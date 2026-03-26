import Fuse from "fuse.js";
import { searchData, SearchItem } from "./search-data";

const fuse = new Fuse(searchData, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "content", weight: 0.25 },
    { name: "keywords", weight: 0.2 },
  ],
  threshold: 0.35,        // slightly more forgiving than 0.4 (Google-like)
  includeScore: true,
  shouldSort: true,
  minMatchCharLength: 2,
  ignoreLocation: true,   // better for long content
});

export function searchProject(query: string): SearchItem[] {
  if (!query?.trim()) return [];

  const results = fuse.search(query);

  return results.map((result: any) => result.item);
}