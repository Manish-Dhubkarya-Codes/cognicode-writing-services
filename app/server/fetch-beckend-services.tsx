import axios from "axios";

/**
 * Single source of truth for API base URL.
 *
 * Live site (cognicodeedutech.com) always uses the Hostinger API.
 * Localhost uses NEXT_PUBLIC_API_URL, then http://127.0.0.1:3000.
 */
const LIVE_API = "https://api.cognicodeedutech.com";

export function getServerURL() {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (/(^|\.)cognicodeedutech\.com$/i.test(host)) {
      return LIVE_API;
    }
  }

  let raw = String(process.env.NEXT_PUBLIC_API_URL || "").trim();
  raw = raw.replace(/\/+$/, "");

  if (raw === "http://localhost:300" || raw === "http://127.0.0.1:300") {
    raw = "http://localhost:3000";
  }

  if (/^https?:\/\/localhost(?::|\/|$)/i.test(raw)) {
    raw = raw.replace(/localhost/i, "127.0.0.1");
  }

  if (raw) {
    return raw;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://127.0.0.1:3000";
    }
  }

  return LIVE_API;
}

/** Snapshot at module load (may be stale in SSR); prefer getServerURL() */
export const serverURL = getServerURL();

function joinUrl(url: string) {
  const base = getServerURL().replace(/\/+$/, "");
  const clean = String(url || "").replace(/^\/+/, "");
  return `${base}/${clean}`;
}

/** Never throw / console.error — Next.js overlay treats console.error as a crash. */
async function silentRequest<T = any>(
  run: () => Promise<{ data?: T }>
): Promise<T | null> {
  try {
    const response = await run();
    return (response?.data ?? null) as T | null;
  } catch {
    return null;
  }
}

const noThrow = { validateStatus: () => true as const };

export const postData = async (
  url: string,
  body: any,
  responseType: "json" | "blob" = "json"
): Promise<any> => {
  return silentRequest<any>(() =>
    axios.post(joinUrl(url), body, {
      ...noThrow,
      responseType,
      timeout: 120000,
    })
  );
};

export const getData = async (url: string): Promise<any> => {
  return silentRequest<any>(() =>
    axios.get(joinUrl(url), { ...noThrow, timeout: 60000 })
  );
};

export const putData = async (url: string, body: any): Promise<any> => {
  return silentRequest<any>(() =>
    axios.put(joinUrl(url), body, { ...noThrow, timeout: 60000 })
  );
};

export const deleteData = async (url: string): Promise<any> => {
  return silentRequest<any>(() =>
    axios.delete(joinUrl(url), { ...noThrow, timeout: 60000 })
  );
};

/** Absolute media URL for API-relative paths like /files/blog/... */
export const mediaUrl = (path?: string | null) => {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = getServerURL().replace(/\/+$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
};
