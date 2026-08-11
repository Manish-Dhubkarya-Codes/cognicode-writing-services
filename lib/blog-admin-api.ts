/**
 * Blog admin API helpers - uses native fetch only.
 * - Hardcoded local API when on localhost (ignores broken env)
 * - NEVER sends x-admin-* headers (avoids CORS preflight failures)
 * - Auth via query string + JSON body fields (backend verifyAdmin supports both)
 */

export type AdminAuth = {
  adminId: number | string;
  email: string;
  name?: string;
};

export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const h = window.location.hostname;
    if (h === "localhost" || h === "127.0.0.1") {
      return "http://localhost:3000";
    }
  }
  const env = String(process.env.NEXT_PUBLIC_API_URL || "")
    .trim()
    .replace(/\/+$/, "");
  if (!env || env.includes("localhost:300") && !env.endsWith("3000")) {
    return "http://localhost:3000";
  }
  return env || "http://localhost:3000";
}

function authQuery(admin: AdminAuth) {
  const q = new URLSearchParams({
    adminId: String(admin.adminId),
    email: String(admin.email || "").trim(),
  });
  return q.toString();
}

function joinUrl(path: string, query?: string) {
  const base = getApiBase().replace(/\/+$/, "");
  const clean = path.replace(/^\/+/, "");
  return query ? `${base}/${clean}?${query}` : `${base}/${clean}`;
}

export function mediaUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }
  const base = getApiBase().replace(/\/+$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

export async function adminListPosts(admin: AdminAuth) {
  const url = joinUrl("blog/admin/posts", authQuery(admin));
  const res = await fetch(url, {
    method: "GET",
    // no custom headers
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`List failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

export async function adminCreatePost(admin: AdminAuth, payload: Record<string, unknown>) {
  const url = joinUrl("blog/admin/posts", authQuery(admin));
  const res = await fetch(url, {
    method: "POST",
    headers: {
      // only standard content-type - allowed by every CORS setup
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      adminId: admin.adminId,
      email: admin.email,
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Create failed (${res.status})`);
  }
  return data;
}

export async function adminDeletePost(admin: AdminAuth, id: number | string) {
  const url = joinUrl(`blog/admin/posts/${id}`, authQuery(admin));
  const res = await fetch(url, { method: "DELETE" });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Delete failed (${res.status})`);
  }
  return data;
}

export async function adminUploadFile(
  admin: AdminAuth,
  file: File,
  extra: Record<string, string> = {}
) {
  const url = joinUrl("blog/admin/upload", authQuery(admin));
  const form = new FormData();
  form.append("file", file);
  form.append("adminId", String(admin.adminId));
  form.append("email", admin.email);
  Object.entries(extra).forEach(([k, v]) => form.append(k, v));

  // Do not set Content-Type - browser sets multipart boundary
  const res = await fetch(url, {
    method: "POST",
    body: form,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Upload failed (${res.status})`);
  }
  return data;
}
