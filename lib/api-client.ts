/**
 * Compatibility re-exports.
 * Blog admin must use @/lib/blog-admin-api (native fetch).
 * This file intentionally does NOT send x-admin headers.
 */

import { getApiBase, mediaUrl as blogMediaUrl } from "@/lib/blog-admin-api";

export function getBaseUrl() {
  return getApiBase();
}

export const serverURL = "http://localhost:3000";

export function apiUrl(path: string) {
  const base = getApiBase().replace(/\/+$/, "");
  const clean = String(path || "").replace(/^\/+/, "");
  return `${base}/${clean}`;
}

export const mediaUrl = blogMediaUrl;

export type AdminAuth = {
  adminId: number | string;
  email: string;
  name?: string;
};

export async function getData(url: string) {
  const full = apiUrl(url);
  try {
    const res = await fetch(full, { method: "GET" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("[api-client getData]", full, e);
    return null;
  }
}

export async function postData(
  url: string,
  body: any,
  responseType: "json" | "blob" = "json"
) {
  const full = apiUrl(url);
  try {
    const res = await fetch(full, {
      method: "POST",
      headers:
        body instanceof FormData
          ? undefined
          : { "Content-Type": "application/json" },
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    if (responseType === "blob") return await res.blob();
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("[api-client postData]", full, e);
    return null;
  }
}

function withAdminQuery(url: string, admin: AdminAuth) {
  const [path, qs = ""] = url.split("?");
  const params = new URLSearchParams(qs);
  params.set("adminId", String(admin.adminId));
  params.set("email", String(admin.email || "").trim());
  return `${path}?${params.toString()}`;
}

/** No custom headers - query + body only */
export async function getDataAuth(url: string, admin: AdminAuth) {
  return getData(withAdminQuery(url, admin));
}

export async function postDataAuth(
  url: string,
  body: any,
  admin: AdminAuth
) {
  return postData(withAdminQuery(url, admin), {
    ...(body || {}),
    adminId: admin.adminId,
    email: admin.email,
  });
}

export async function putDataAuth(
  url: string,
  body: any,
  admin: AdminAuth
) {
  const full = apiUrl(withAdminQuery(url, admin));
  try {
    const res = await fetch(full, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(body || {}),
        adminId: admin.adminId,
        email: admin.email,
      }),
    });
    return await res.json();
  } catch (e) {
    console.error("[api-client putDataAuth]", full, e);
    return { success: false, message: "Request failed" };
  }
}

export async function deleteDataAuth(url: string, admin: AdminAuth) {
  const full = apiUrl(withAdminQuery(url, admin));
  try {
    const res = await fetch(full, { method: "DELETE" });
    return await res.json();
  } catch (e) {
    console.error("[api-client deleteDataAuth]", full, e);
    return { success: false, message: "Request failed" };
  }
}

export async function uploadBlogFile(
  file: File,
  admin: AdminAuth,
  extra: Record<string, string> = {}
) {
  const full = apiUrl(
    `blog/admin/upload?adminId=${encodeURIComponent(String(admin.adminId))}&email=${encodeURIComponent(admin.email)}`
  );
  try {
    const form = new FormData();
    form.append("file", file);
    form.append("adminId", String(admin.adminId));
    form.append("email", admin.email);
    Object.entries(extra).forEach(([k, v]) => form.append(k, v));
    const res = await fetch(full, { method: "POST", body: form });
    return await res.json();
  } catch (e) {
    console.error("[api-client upload]", full, e);
    return { success: false, message: "Upload failed" };
  }
}
