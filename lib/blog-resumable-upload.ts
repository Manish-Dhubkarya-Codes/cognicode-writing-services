import {
  getData,
  mediaUrl,
  postData,
} from "@/app/server/fetch-beckend-services";
import type { MediaKind, ResumeState, UploadRequestOptions } from "@/components/blog/upload-slot";

const DEFAULT_CHUNK_SIZE = 256 * 1024;

function abortError() {
  const err = new Error("UPLOAD_ABORTED");
  err.name = "AbortError";
  return err;
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) throw abortError();
}

function extractUrl(res: any): string {
  return (
    res?.data?.url ||
    res?.data?.path ||
    res?.data?.fileUrl ||
    res?.url ||
    (typeof res?.data === "string" ? res.data : "")
  );
}

async function uploadWholeFile(
  file: File,
  kind: MediaKind,
  authQuery: string,
  admin: { adminId: number | string; email: string },
  options?: UploadRequestOptions
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("filename", file.name);
  formData.append("originalName", file.name);
  formData.append("adminId", String(admin.adminId));
  formData.append("email", admin.email);
  formData.append("mediaType", kind === "video" ? "video" : kind === "document" ? "document" : "image");
  const res = await postData(`blog/admin/upload?${authQuery}`, formData, "json", {
    signal: options?.signal,
    onUploadProgress: options?.onProgress,
  });
  const url = extractUrl(res);
  if (!url) {
    const err = new Error(res?.message || "Could not upload file");
    (err as any).uploadMessage = res?.message;
    throw err;
  }
  return mediaUrl(url);
}

export async function uploadBlogFileResumable(input: {
  file: File;
  kind: MediaKind;
  admin: { adminId: number | string; email: string };
  authQuery: string;
  options?: UploadRequestOptions;
}): Promise<string | null> {
  const { file, kind, admin, authQuery, options } = input;
  throwIfAborted(options?.signal);

  const mediaType = kind === "video" ? "video" : kind === "document" ? "document" : "image";
  let state = options?.resumeState || null;

  if (!state?.uploadId) {
    const init = await postData(`blog/admin/upload/init?${authQuery}`, {
      originalName: file.name,
      mimeType: file.type || "",
      mediaType,
      totalSize: file.size,
      adminId: admin.adminId,
      email: admin.email,
    });
    if (!init?.success || !init?.data?.uploadId) {
      return uploadWholeFile(file, kind, authQuery, admin, options);
    }
    state = {
      uploadId: String(init.data.uploadId),
      nextOffset: Number(init.data.receivedBytes || 0),
      totalSize: file.size,
      chunkSize: Number(init.data.chunkSize || DEFAULT_CHUNK_SIZE),
    };
    options?.onResumeState?.(state);
  } else {
    const status = await getData(`blog/admin/upload/session/${encodeURIComponent(state.uploadId)}?${authQuery}`);
    if (status?.success && status.data) {
      state = {
        ...state,
        nextOffset: Number(status.data.receivedBytes || 0),
        totalSize: Number(status.data.totalSize || file.size),
        chunkSize: Number(status.data.chunkSize || state.chunkSize || DEFAULT_CHUNK_SIZE),
      };
      options?.onResumeState?.(state);
    }
  }

  const chunkSize = state.chunkSize || DEFAULT_CHUNK_SIZE;
  let offset = Math.max(0, state.nextOffset || 0);
  options?.onProgress?.(file.size ? Math.round((offset * 100) / file.size) : 0);

  while (offset < file.size) {
    throwIfAborted(options?.signal);
    const end = Math.min(offset + chunkSize, file.size);
    const mime = file.type || "application/octet-stream";
    const blob = file.slice(offset, end, mime);
    const chunkFile = new File([blob], file.name, { type: mime });
    const formData = new FormData();
    formData.append("file", chunkFile, file.name);
    formData.append("uploadId", state.uploadId);
    formData.append("offset", String(offset));
    formData.append("adminId", String(admin.adminId));
    formData.append("email", admin.email);

    const res = await postData(`blog/admin/upload/chunk?${authQuery}`, formData, "json", {
      signal: options?.signal,
      onUploadProgress: (pct) => {
        const sent = offset + ((end - offset) * pct) / 100;
        options?.onProgress?.(file.size ? Math.round((sent * 100) / file.size) : 0);
      },
    });

    if (res?.data?.expectedOffset != null && Number(res.data.expectedOffset) !== offset) {
      offset = Number(res.data.receivedBytes || res.data.expectedOffset || 0);
      state = { ...state, nextOffset: offset };
      options?.onResumeState?.(state);
      continue;
    }
    if (!res?.success) {
      const err = new Error(res?.message || "Chunk upload failed");
      (err as any).uploadMessage = res?.message;
      throw err;
    }
    offset = Number(res.data?.receivedBytes ?? end);
    state = { ...state, nextOffset: offset };
    options?.onResumeState?.(state);
    options?.onProgress?.(file.size ? Math.round((offset * 100) / file.size) : 100);
  }

  throwIfAborted(options?.signal);
  const done = await postData(`blog/admin/upload/complete?${authQuery}`, {
    uploadId: state.uploadId,
    adminId: admin.adminId,
    email: admin.email,
  });
  const url = extractUrl(done);
  if (!url) {
    const err = new Error(done?.message || "Could not complete upload");
    (err as any).uploadMessage = done?.message;
    throw err;
  }
  options?.onResumeState?.(null);
  options?.onProgress?.(100);
  return mediaUrl(url);
}
