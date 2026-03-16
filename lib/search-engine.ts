import Fuse from "fuse.js";
import { searchData, SearchItem } from "./search-data";

const fuse = new Fuse(searchData, {
keys: ["title", "description", "keywords"],
threshold: 0.4,
includeScore: true
});

export function searchProject(query: string): SearchItem[] {
if (!query) return [];

const results = fuse.search(query);

return results.map((result:any) => result.item);
}
