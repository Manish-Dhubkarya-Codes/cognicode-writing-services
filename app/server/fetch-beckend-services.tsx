import axios from "axios";

/**
 * Resolve API base for local + production.
 * - localhost / 127.0.0.1 → http://localhost:3000
 * - cognicodeedutech.com (and all other hosts) → NEXT_PUBLIC_API_URL
 *   (production: https://api.cognicodeedutech.com)
 */
export function getServerURL() {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:3000";
    }
  }

  let raw = String(
    process.env.NEXT_PUBLIC_API_URL || "https://api.cognicodeedutech.com"
  ).trim();
  raw = raw.replace(/\/+$/, "");

  // Fix truncated local port typos
  if (/localhost:300$/i.test(raw) || /127\.0\.0\.1:300$/i.test(raw)) {
    raw = "http://localhost:3000";
  }

  return raw || "https://api.cognicodeedutech.com";
}

/** @deprecated Prefer getServerURL() at call time */
export const serverURL = getServerURL();

function joinUrl(url: string) {
  const base = getServerURL().replace(/\/+$/, "");
  const clean = String(url || "").replace(/^\/+/, "");
  return `${base}/${clean}`;
}

export const postData = async (
  url: string,
  body: any,
  responseType: "json" | "blob" = "json"
) => {
  const full = joinUrl(url);
  try {
    const isForm =
      typeof FormData !== "undefined" && body instanceof FormData;
    const response = await axios.post(full, body, {
      responseType,
      timeout: 120000,
      // Let browser set multipart boundary for FormData
      headers: isForm ? undefined : undefined,
    });
    return response.data;
  } catch (e: any) {
    console.error("[postData]", full, e?.response?.status, e?.message);
    return e?.response?.data || null;
  }
};

export const getData = async (url: string) => {
  const full = joinUrl(url);
  try {
    const response = await axios.get(full, { timeout: 60000 });
    return response.data;
  } catch (e: any) {
    console.error("[getData]", full, e?.response?.status, e?.message);
    return e?.response?.data || null;
  }
};

export const putData = async (url: string, body: any) => {
  const full = joinUrl(url);
  try {
    const response = await axios.put(full, body, { timeout: 60000 });
    return response.data;
  } catch (e: any) {
    console.error("[putData]", full, e?.response?.status, e?.message);
    return e?.response?.data || null;
  }
};

export const deleteData = async (url: string) => {
  const full = joinUrl(url);
  try {
    const response = await axios.delete(full, { timeout: 60000 });
    return response.data;
  } catch (e: any) {
    console.error("[deleteData]", full, e?.response?.status, e?.message);
    return e?.response?.data || null;
  }
};

/** Absolute media URL for /files/... paths from the API */
export const mediaUrl = (path?: string | null) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = getServerURL().replace(/\/+$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
};
