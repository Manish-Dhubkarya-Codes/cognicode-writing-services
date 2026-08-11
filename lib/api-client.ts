/**
 * Compatibility re-exports of the shared API helper.
 * Prefer: import { getData, postData } from "@/app/server/fetch-beckend-services";
 */

export {
  getData,
  postData,
  putData,
  deleteData,
  getServerURL,
  mediaUrl,
  serverURL,
} from "@/app/server/fetch-beckend-services";

export { getServerURL as getBaseUrl } from "@/app/server/fetch-beckend-services";

export type AdminAuth = {
  adminId: number | string;
  email: string;
  name?: string;
};

import {
  getData as sharedGet,
  postData as sharedPost,
  deleteData as sharedDelete,
} from "@/app/server/fetch-beckend-services";

function authQs(admin: AdminAuth) {
  return `adminId=${encodeURIComponent(String(admin.adminId))}&email=${encodeURIComponent(
    String(admin.email || "").trim()
  )}`;
}

export async function getDataAuth(url: string, admin: AdminAuth) {
  const sep = url.includes("?") ? "&" : "?";
  return sharedGet(`${url}${sep}${authQs(admin)}`);
}

export async function postDataAuth(url: string, body: any, admin: AdminAuth) {
  const sep = url.includes("?") ? "&" : "?";
  return sharedPost(`${url}${sep}${authQs(admin)}`, {
    ...(body || {}),
    adminId: admin.adminId,
    email: admin.email,
  });
}

export async function deleteDataAuth(url: string, admin: AdminAuth) {
  const sep = url.includes("?") ? "&" : "?";
  return sharedDelete(`${url}${sep}${authQs(admin)}`);
}

export async function uploadBlogFile(
  file: File,
  admin: AdminAuth,
  extra: Record<string, string> = {}
) {
  const form = new FormData();
  form.append("file", file);
  form.append("adminId", String(admin.adminId));
  form.append("email", admin.email);
  Object.entries(extra).forEach(([k, v]) => form.append(k, v));
  return sharedPost(`blog/admin/upload?${authQs(admin)}`, form);
}
