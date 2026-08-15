"use client";

import { getData, postData } from "@/app/server/fetch-beckend-services";

export type SiteUser = {
  userId: number;
  username: string;
  displayName?: string;
  email?: string | null;
  mobile?: string | null;
  channel: "email" | "mobile";
  token: string;
  isBlocked?: boolean;
};

export type SiteAdmin = {
  adminId: number | string;
  email: string;
  name?: string;
};

export type AuthChannel = "email";
export type AuthMode = "login" | "register";

const STORAGE_KEY = "siteUser";
export const SITE_USER_EVENT = "cognicode:site-user";
export const OPEN_AUTH_EVENT = "cognicode:open-auth";
export const SITE_USER_BLOCKED_EVENT = "cognicode:site-user-blocked";

export function notifyUserBlocked(message?: string) {
  if (typeof window === "undefined") return;
  setSiteUser(null);
  window.dispatchEvent(
    new CustomEvent(SITE_USER_BLOCKED_EVENT, {
      detail: {
        message:
          message ||
          "This account has been locked by CogniCode admin. You cannot log in or register with this email.",
      },
    })
  );
}

export function getSiteUser(): SiteUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.userId || !parsed?.token || !parsed?.username) return null;
    return parsed as SiteUser;
  } catch {
    return null;
  }
}

export function setSiteUser(user: SiteUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SITE_USER_EVENT, { detail: user }));
}

export function userAuthPayload(user?: SiteUser | null) {
  const u = user || getSiteUser();
  if (!u) return {};
  return { userId: u.userId, token: u.token };
}

export function userAuthQuery(user?: SiteUser | null) {
  const u = user || getSiteUser();
  if (!u) return "";
  return `userId=${encodeURIComponent(String(u.userId))}&token=${encodeURIComponent(u.token)}`;
}

export function getSiteAdmin(): SiteAdmin | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("admin");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.adminId || !parsed?.email) return null;
    return {
      adminId: parsed.adminId,
      email: parsed.email,
      name: parsed.name,
    };
  } catch {
    return null;
  }
}

export function adminAuthPayload(admin?: SiteAdmin | null) {
  const a = admin || getSiteAdmin();
  if (!a) return {};
  return { adminId: a.adminId, email: a.email };
}

export function adminAuthQuery(admin?: SiteAdmin | null) {
  const a = admin || getSiteAdmin();
  if (!a) return "";
  return `adminId=${encodeURIComponent(String(a.adminId))}&email=${encodeURIComponent(a.email)}`;
}

export function viewerQuery() {
  return [userAuthQuery(), adminAuthQuery()].filter(Boolean).join("&");
}

export function requestOpenAuth(detail?: { mode?: AuthMode; reason?: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_AUTH_EVENT, { detail: detail || {} }));
}

export async function sendSiteOtp(input: {
  destination: string;
  purpose: AuthMode;
}) {
  return postData("site-users/send-otp", {
    channel: "email",
    destination: input.destination,
    purpose: input.purpose,
  });
}

export async function loginSiteUser(input: {
  identifier: string;
  password: string;
}) {
  return postData("site-users/login", {
    identifier: input.identifier,
    password: input.password,
  });
}

export async function registerSiteUser(input: {
  email: string;
  password: string;
  username: string;
  displayName?: string;
  otp: string;
}) {
  return postData("site-users/register", {
    email: input.email,
    password: input.password,
    username: input.username,
    displayName: input.displayName,
    otp: input.otp,
  });
}

export async function fetchSiteUserSession() {
  const user = getSiteUser();
  if (!user) return { success: false };
  return postData("site-users/me", userAuthPayload(user));
}

export async function checkUsernameAvailable(username: string) {
  return getData(`site-users/username-available?username=${encodeURIComponent(username)}`);
}

export async function logoutSiteUser() {
  const user = getSiteUser();
  if (user) {
    try {
      await postData("site-users/logout", userAuthPayload(user));
    } catch {
      // ignore network errors on logout
    }
  }
  setSiteUser(null);
}
