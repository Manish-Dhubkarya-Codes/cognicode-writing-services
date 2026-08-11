import axios from "axios";

/** Always a clean base URL with no trailing slash */
export function getServerURL() {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:3000";
    }
  }
  let raw = String(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").trim();
  raw = raw.replace(/\/+$/, "");
  if (/localhost:300$/i.test(raw) || /127\.0\.0\.1:300$/i.test(raw)) {
    raw = "http://localhost:3000";
  }
  return raw || "http://localhost:3000";
}

export const serverURL = getServerURL();

function joinUrl(url: string) {
  const base = getServerURL().replace(/\/+$/, "");
  const clean = String(url || "").replace(/^\/+/, "");
  return base + "/" + clean;
}

export const postData = async (
  url: string,
  body: any,
  responseType: "json" | "blob" = "json"
) => {
  const full = joinUrl(url);
  try {
    const response = await axios.post(full, body, { responseType, timeout: 60000 });
    return response.data;
  } catch (e) {
    console.error("[postData]", full, e);
    return null;
  }
};

export const getData = async (url: string) => {
  const full = joinUrl(url);
  try {
    const response = await axios.get(full, { timeout: 30000 });
    return response.data;
  } catch (e) {
    console.error("[getData]", full, e);
    return null;
  }
};
