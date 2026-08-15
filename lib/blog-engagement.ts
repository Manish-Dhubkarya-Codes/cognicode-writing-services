"use client";

import {
  deleteData,
  getData,
  postData,
} from "@/app/server/fetch-beckend-services";
import {
  adminAuthPayload,
  adminAuthQuery,
  getSiteAdmin,
  getSiteUser,
  notifyUserBlocked,
  userAuthPayload,
  viewerQuery,
} from "@/lib/site-user";

export type EngagementStats = {
  likes: number;
  comments: number;
  shares: number;
  likedByMe: boolean;
  previewComments?: BlogComment[];
};

export type BlogCommentUser = {
  userId: number;
  username: string;
  displayName?: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
};

export type BlogComment = {
  id: number;
  body: string;
  postSlug: string;
  parentId?: number | null;
  isPinned?: boolean;
  isAdmin?: boolean;
  createdAt: string;
  user: BlogCommentUser;
  replies?: BlogComment[];
};

function withViewer(url: string) {
  const qs = viewerQuery();
  if (!qs) return url;
  return url.includes("?") ? `${url}&${qs}` : `${url}?${qs}`;
}

export async function fetchEngagementStats(slugs: string[]) {
  if (!slugs.length) return {} as Record<string, EngagementStats>;
  const res = await getData(
    withViewer(`blog-engagement/stats?slugs=${encodeURIComponent(slugs.join(","))}`)
  );
  if (res?.success && res.data) return res.data as Record<string, EngagementStats>;
  return {};
}

export async function fetchPostEngagement(slug: string) {
  const res = await getData(
    withViewer(`blog-engagement/post/${encodeURIComponent(slug)}`)
  );
  if (res?.success && res.data) {
    return {
      likes: Number(res.data.likes || 0),
      comments: Number(res.data.comments || 0),
      shares: Number(res.data.shares || 0),
      likedByMe: Boolean(res.data.likedByMe),
      previewComments: Array.isArray(res.data.previewComments)
        ? res.data.previewComments
        : [],
      commentList: Array.isArray(res.data.commentList) ? res.data.commentList : [],
    } as EngagementStats & { commentList: BlogComment[] };
  }
  return {
    likes: 0,
    comments: 0,
    shares: 0,
    likedByMe: false,
    previewComments: [] as BlogComment[],
    commentList: [] as BlogComment[],
  };
}

export async function togglePostLike(slug: string, liked: boolean) {
  const user = getSiteUser();
  const admin = getSiteAdmin();
  if (!user && !admin) {
    return { success: false, needsLogin: true, message: "Log in to like posts" };
  }
  const path = liked ? "blog-engagement/unlike" : "blog-engagement/like";
  const res = await postData(path, {
    postSlug: slug,
    ...userAuthPayload(user),
    ...adminAuthPayload(admin),
  });
  if (res?.blocked) notifyUserBlocked(res.message);
  return res;
}

export async function addPostComment(
  slug: string,
  body: string,
  parentId?: number | null
) {
  const user = getSiteUser();
  const admin = getSiteAdmin();
  if (!user && !admin) {
    return { success: false, needsLogin: true, message: "Log in to comment" };
  }
  if (!user && admin) return addAdminComment(slug, body, parentId);
  return postData("blog-engagement/comment", {
    postSlug: slug,
    body,
    parentId: parentId || undefined,
    ...userAuthPayload(user),
  });
}

export async function addAdminComment(
  slug: string,
  body: string,
  parentId?: number | null
) {
  const admin = getSiteAdmin();
  if (!admin) return { success: false, message: "Admin login required" };
  return postData("blog-engagement/admin/comment", {
    postSlug: slug,
    body,
    parentId: parentId || undefined,
    ...adminAuthPayload(admin),
  });
}

export async function pinPostComment(id: number, pinned?: boolean) {
  const admin = getSiteAdmin();
  if (!admin) return { success: false, message: "Admin login required" };
  return postData(`blog-engagement/admin/comment/${id}/pin`, {
    pinned,
    ...adminAuthPayload(admin),
  });
}

export async function fetchAdminComments(options?: { q?: string; slug?: string }) {
  const admin = getSiteAdmin();
  if (!admin) return { success: false, data: [] as BlogComment[] };
  const params = new URLSearchParams();
  if (options?.q) params.set("q", options.q);
  if (options?.slug) params.set("slug", options.slug);
  const qs = [adminAuthQuery(admin), params.toString()].filter(Boolean).join("&");
  return getData(`blog-engagement/admin/comments?${qs}`);
}

export async function deletePostComment(id: number) {
  const user = getSiteUser();
  const admin = getSiteAdmin();
  if (!user && !admin) return { success: false, needsLogin: true };
  const qs = [user ? `userId=${encodeURIComponent(String(user.userId))}&token=${encodeURIComponent(user.token)}` : "", adminAuthQuery(admin)]
    .filter(Boolean)
    .join("&");
  return deleteData(`blog-engagement/comment/${id}${qs ? `?${qs}` : ""}`);
}

export async function recordPostShare(slug: string, channel = "native") {
  return postData("blog-engagement/share", {
    postSlug: slug,
    channel,
    ...userAuthPayload(),
    ...adminAuthPayload(),
  });
}

export const SAVED_POSTS_KEY = "savedPosts";
export const SAVED_POSTS_EVENT = "cognicode:saved-posts";
export const FOLLOW_KEY = "blogFollowing";

export function getLocalSavedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_POSTS_KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function setLocalSavedSlugs(slugs: string[], notify = true) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(slugs));
  if (notify) {
    window.dispatchEvent(new CustomEvent(SAVED_POSTS_EVENT, { detail: slugs }));
  }
}

export type MyBlogActivity = {
  saved: string[];
  liked: string[];
  shared: string[];
};

let mineRequest: Promise<MyBlogActivity> | null = null;
let mineCache: MyBlogActivity | null = null;
let mineCacheAt = 0;

export async function fetchMyActivity(force = false): Promise<MyBlogActivity> {
  const empty: MyBlogActivity = { saved: getLocalSavedSlugs(), liked: [], shared: [] };
  const user = getSiteUser();
  const admin = getSiteAdmin();
  if (!user && !admin) return empty;
  if (!force && mineCache && Date.now() - mineCacheAt < 8000) return mineCache;
  if (!force && mineRequest) return mineRequest;

  mineRequest = (async () => {
    const res = await getData(withViewer("blog-engagement/mine"));
    if (!res?.success || !res.data) return empty;
    const saved = Array.from(
      new Set([
        ...getLocalSavedSlugs(),
        ...(Array.isArray(res.data.saved) ? res.data.saved : []),
      ])
    );
    setLocalSavedSlugs(saved, false);
    const next = {
      saved,
      liked: Array.isArray(res.data.liked) ? res.data.liked : [],
      shared: Array.isArray(res.data.shared) ? res.data.shared : [],
    };
    mineCache = next;
    mineCacheAt = Date.now();
    return next;
  })();

  try {
    return await mineRequest;
  } finally {
    mineRequest = null;
  }
}

export async function fetchSavedSlugs() {
  const mine = await fetchMyActivity();
  return mine.saved;
}

export async function toggleSavedPost(slug: string, saved: boolean) {
  const next = saved
    ? getLocalSavedSlugs().filter((item) => item !== slug)
    : Array.from(new Set([...getLocalSavedSlugs(), slug]));
  mineCache = mineCache
    ? { ...mineCache, saved: next }
    : { saved: next, liked: [], shared: [] };
  mineCacheAt = Date.now();
  setLocalSavedSlugs(next);
  const user = getSiteUser();
  const admin = getSiteAdmin();
  if (user || admin) {
    await postData(saved ? "blog-engagement/unsave" : "blog-engagement/save", {
      postSlug: slug,
      ...userAuthPayload(user),
      ...adminAuthPayload(admin),
    });
  }
  return { success: true, saved: !saved, slugs: next };
}

export async function followCogniCode(input?: { email?: string; source?: string; name?: string }) {
  const user = getSiteUser();
  const admin = getSiteAdmin();
  return postData("blog/follow", {
    email: input?.email || user?.email || admin?.email || "",
    name: input?.name || user?.displayName || user?.username || admin?.name || "",
    source: input?.source || "follow",
    ...userAuthPayload(user),
    ...adminAuthPayload(admin),
  });
}

export async function fetchFollowStatus() {
  const user = getSiteUser();
  const admin = getSiteAdmin();
  const email = user?.email || admin?.email || "";
  const qs = [viewerQuery(), email ? `email=${encodeURIComponent(email)}` : ""]
    .filter(Boolean)
    .join("&");
  return getData(`blog/follow/status${qs ? `?${qs}` : ""}`);
}

export async function recordPostVisit(slug: string, path?: string) {
  return postData("blog-engagement/visit", {
    postSlug: slug,
    path: path || (typeof window !== "undefined" ? window.location.pathname : ""),
    ...userAuthPayload(),
  });
}
