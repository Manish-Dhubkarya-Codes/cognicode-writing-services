/**
 * Thin wrappers around the shared fetch-backend helper for blog admin.
 * Prefer importing getData/postData/deleteData from the server helper directly.
 */
export type AdminAuth = {
  adminId: number | string;
  email: string;
  name?: string;
};

export function authQuery(admin: AdminAuth) {
  return `adminId=${encodeURIComponent(String(admin.adminId))}&email=${encodeURIComponent(
    String(admin.email || "").trim()
  )}`;
}
