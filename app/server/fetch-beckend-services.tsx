import axios from "axios";

/**
 * Single source of truth for API base URL.
 *
 * Live site (cognicodeedutech.com) always uses the Hostinger API.
 * Localhost uses NEXT_PUBLIC_API_URL, then http://127.0.0.1:3000.
 */
const LIVE_API = "http://localhost:3000";

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

export type PostDataExtra = {
  signal?: AbortSignal;
  onUploadProgress?: (percent: number) => void;
};

function postFormData(
  url: string,
  body: FormData,
  extra?: PostDataExtra
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.timeout = 180000;
    xhr.responseType = "text";

    const onAbort = () => xhr.abort();
    extra?.signal?.addEventListener("abort", onAbort);

    xhr.upload.onprogress = (event) => {
      if (!extra?.onUploadProgress) return;
      const total = event.total || 0;
      const pct = total ? Math.round((event.loaded * 100) / total) : 0;
      extra.onUploadProgress(Math.max(0, Math.min(100, pct)));
    };

    xhr.onload = () => {
      extra?.signal?.removeEventListener("abort", onAbort);
      const raw = xhr.responseText || "";
      try {
        resolve(raw ? JSON.parse(raw) : null);
      } catch {
        resolve({ success: false, message: raw || `Upload failed (${xhr.status})` });
      }
    };
    xhr.onerror = () => {
      extra?.signal?.removeEventListener("abort", onAbort);
      resolve({ success: false, message: "Network error while uploading" });
    };
    xhr.onabort = () => {
      extra?.signal?.removeEventListener("abort", onAbort);
      const abortErr = new Error("UPLOAD_ABORTED");
      abortErr.name = "AbortError";
      reject(abortErr);
    };
    xhr.ontimeout = () => {
      extra?.signal?.removeEventListener("abort", onAbort);
      resolve({ success: false, message: "Upload timed out" });
    };

    xhr.send(body);
  });
}

export const postData = async (
  url: string,
  body: any,
  responseType: "json" | "blob" = "json",
  extra?: PostDataExtra
): Promise<any> => {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  if (isForm && typeof XMLHttpRequest !== "undefined") {
    try {
      return await postFormData(joinUrl(url), body, extra);
    } catch (err: any) {
      if (err?.name === "AbortError") throw err;
      return { success: false, message: err?.message || "Upload failed" };
    }
  }

  try {
    const response = await axios.post(joinUrl(url), body, {
      ...noThrow,
      responseType,
      timeout: 180000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      signal: extra?.signal,
      onUploadProgress: extra?.onUploadProgress
        ? (event) => {
            const total = event.total || 0;
            const pct = total
              ? Math.round((event.loaded * 100) / total)
              : Math.round((event.progress || 0) * 100);
            extra.onUploadProgress?.(Math.max(0, Math.min(100, pct)));
          }
        : undefined,
    });
    return response?.data ?? null;
  } catch (err: any) {
    if (
      extra?.signal?.aborted ||
      err?.code === "ERR_CANCELED" ||
      err?.name === "CanceledError" ||
      err?.name === "AbortError"
    ) {
      const abortErr = new Error("UPLOAD_ABORTED");
      abortErr.name = "AbortError";
      throw abortErr;
    }
    return null;
  }
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
