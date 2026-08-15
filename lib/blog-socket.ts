"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { getServerURL } from "@/app/server/fetch-beckend-services";
import { getSiteUser, notifyUserBlocked } from "@/lib/site-user";

let socket: Socket | null = null;

export function getBlogSocket() {
  if (typeof window === "undefined") return null;
  if (!socket) {
    socket = io(getServerURL(), {
      transports: ["websocket", "polling"],
      withCredentials: true,
      autoConnect: true,
    });
    socket.on("connect", () => {
      socket?.emit("joinBlogFeed");
      const user = getSiteUser();
      if (user?.userId) socket?.emit("joinSiteUser", user.userId);
    });
    socket.on("site-user:blocked", (payload: { message?: string }) => {
      notifyUserBlocked(payload?.message);
    });
  }
  return socket;
}

export type BlogLiveEvent =
  | "blog:like"
  | "blog:comment"
  | "blog:comment-deleted"
  | "blog:comment-pinned"
  | "blog:share";

export function useBlogLive(
  onEvent: (event: BlogLiveEvent, payload: any) => void,
  slug?: string
) {
  useEffect(() => {
    const live = getBlogSocket();
    if (!live) return;

    const handle = (event: BlogLiveEvent) => (payload: any) => {
      if (slug && payload?.slug && payload.slug !== slug) return;
      onEvent(event, payload);
    };

    const onLike = handle("blog:like");
    const onComment = handle("blog:comment");
    const onDeleted = handle("blog:comment-deleted");
    const onPinned = handle("blog:comment-pinned");
    const onShare = handle("blog:share");

    live.on("blog:like", onLike);
    live.on("blog:comment", onComment);
    live.on("blog:comment-deleted", onDeleted);
    live.on("blog:comment-pinned", onPinned);
    live.on("blog:share", onShare);
    const user = getSiteUser();
    if (user?.userId) live.emit("joinSiteUser", user.userId);
    if (slug) live.emit("joinBlogPost", slug);

    return () => {
      live.off("blog:like", onLike);
      live.off("blog:comment", onComment);
      live.off("blog:comment-deleted", onDeleted);
      live.off("blog:comment-pinned", onPinned);
      live.off("blog:share", onShare);
      if (slug) live.emit("leaveBlogPost", slug);
    };
  }, [onEvent, slug]);
}
