"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileUp,
  Pause,
  Play,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mediaUrl } from "@/app/server/fetch-beckend-services";

export type MediaKind = "image" | "video" | "document" | "gallery";

export type ResumeState = {
  uploadId: string;
  nextOffset: number;
  totalSize: number;
  chunkSize: number;
};

export type UploadRequestOptions = {
  signal?: AbortSignal;
  onProgress?: (percent: number) => void;
  resumeState?: ResumeState | null;
  onResumeState?: (state: ResumeState | null) => void;
};

export type UploadFn = (
  file: File,
  kind: MediaKind,
  options?: UploadRequestOptions
) => Promise<string | null>;

export type ComposerAttachment = {
  title: string;
  description?: string;
  url: string;
  fileLabel?: string;
  fileType?: string;
  sizeLabel?: string;
  pending?: boolean;
  error?: string;
  tempKey?: string;
  _file?: File;
};

export const DOCUMENT_ACCEPT =
  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.csv,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/zip,text/plain,text/csv";

type SlotStatus = "idle" | "uploading" | "paused" | "error" | "done";

export function formatBytes(n: number) {
  if (!Number.isFinite(n) || n < 0) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileNameFromUrl(url?: string) {
  if (!url) return "";
  try {
    const clean = decodeURIComponent(url.split("?")[0] || "");
    const name = clean.split("/").filter(Boolean).pop() || "";
    return name || url;
  } catch {
    return url;
  }
}

function CircularProgress({
  value,
  spinning,
  size = 52,
}: {
  value: number;
  spinning?: boolean;
  size?: number;
}) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn("-rotate-90", spinning && pct < 5 && "animate-spin")}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-muted"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-primary"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - (spinning && pct < 5 ? 0.2 : pct / 100))}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tabular-nums text-foreground">
        {spinning && pct < 5 ? "" : `${pct}%`}
      </span>
    </div>
  );
}

function statusLabel(status: SlotStatus, progress: number) {
  if (status === "uploading") return `Uploading ${Math.max(progress, 0)}%`;
  if (status === "paused") return `Paused at ${Math.max(progress, 0)}% — resume from here`;
  if (status === "error") return "Upload failed — resume to retry remaining bytes";
  if (status === "done") return "Uploaded";
  return "No file selected";
}

export function FilePicker({
  label,
  accept,
  icon: Icon,
  kind,
  currentUrl,
  currentName,
  preview = "none",
  onUpload,
  onComplete,
  onClear,
  onBusyChange,
}: {
  label: string;
  accept?: string;
  icon: LucideIcon;
  kind: MediaKind;
  currentUrl?: string;
  currentName?: string;
  preview?: "image" | "video" | "none";
  onUpload: UploadFn;
  onComplete: (url: string, file: File) => void;
  onClear: () => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const fileRef = useRef<File | null>(null);
  const resumeRef = useRef<ResumeState | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(currentUrl ? 100 : 0);
  const [status, setStatus] = useState<SlotStatus>(currentUrl ? "done" : "idle");
  const [localPreview, setLocalPreview] = useState("");

  useEffect(() => {
    if (currentUrl) {
      if (status === "idle" || (!file && status !== "uploading" && status !== "paused")) {
        setStatus("done");
        setProgress(100);
      }
      return;
    }
    if (!file && status !== "uploading" && status !== "paused" && status !== "error") {
      setStatus("idle");
      setProgress(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (localPreview.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startUpload = async (nextFile: File, fromPause = false) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    fileRef.current = nextFile;
    setFile(nextFile);
    setStatus("uploading");
    if (!fromPause) {
      resumeRef.current = null;
      setProgress(0);
    }
    onBusyChange?.(true);
    if (preview === "image" || preview === "video") {
      if (localPreview.startsWith("blob:")) URL.revokeObjectURL(localPreview);
      setLocalPreview(URL.createObjectURL(nextFile));
    }
    try {
      const url = await onUpload(nextFile, kind, {
        signal: ac.signal,
        resumeState: fromPause ? resumeRef.current : null,
        onResumeState: (state) => {
          resumeRef.current = state;
        },
        onProgress: (pct) => {
          if (!ac.signal.aborted) setProgress(pct);
        },
      });
      if (ac.signal.aborted) return;
      if (url) {
        resumeRef.current = null;
        setProgress(100);
        setStatus("done");
        onComplete(url, nextFile);
      } else {
        setStatus("error");
      }
    } catch (err: any) {
      if (err?.name === "AbortError" || ac.signal.aborted) {
        setStatus("paused");
        return;
      }
      setStatus("error");
    } finally {
      onBusyChange?.(false);
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    setStatus("paused");
    onBusyChange?.(false);
  };

  const resume = () => {
    const next = fileRef.current;
    if (!next) {
      inputRef.current?.click();
      return;
    }
    void startUpload(next, true);
  };

  const remove = () => {
    abortRef.current?.abort();
    resumeRef.current = null;
    fileRef.current = null;
    setFile(null);
    setStatus("idle");
    setProgress(0);
    if (localPreview.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    setLocalPreview("");
    onBusyChange?.(false);
    onClear();
    if (inputRef.current) inputRef.current.value = "";
  };

  const shownName = file?.name || currentName || (currentUrl ? fileNameFromUrl(currentUrl) : "");
  const shownSize = file ? formatBytes(file.size) : "";
  const previewSrc = localPreview || (preview !== "none" ? currentUrl : "");

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          const next = e.target.files?.[0];
          e.target.value = "";
          if (next) void startUpload(next);
        }}
      />
      <div className="rounded-xl border border-dashed border-border bg-background p-3">
        <button
          type="button"
          disabled={status === "uploading"}
          onClick={() => {
            if (status === "uploading") return;
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.click();
            }
          }}
          className="flex w-full flex-col items-center gap-2 text-xs disabled:cursor-default"
        >
          {status === "uploading" ? (
            <CircularProgress value={progress} spinning />
          ) : (
            <Icon className="h-5 w-5 text-primary" />
          )}
          <span className="font-medium text-foreground">
            {status === "uploading" ? "Uploading this file" : label}
          </span>
        </button>

        {shownName ? (
          <div className="mt-2 min-w-0 text-center">
            <p className="truncate text-xs font-medium text-foreground">{shownName}</p>
            <p className="text-[11px] text-muted-foreground">
              {[shownSize, statusLabel(status, progress)].filter(Boolean).join(" · ")}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-center text-[11px] text-muted-foreground">No file selected</p>
        )}

        {preview === "image" && previewSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mediaUrl(previewSrc)} alt="" className="mx-auto mt-2 h-16 rounded-lg object-cover" />
        ) : null}
        {preview === "video" && previewSrc ? (
          <p className="mt-2 truncate text-center text-[11px] text-muted-foreground">
            {fileNameFromUrl(previewSrc)}
          </p>
        ) : null}

        {status !== "idle" || currentUrl ? (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {status === "uploading" ? (
              <Button type="button" size="sm" variant="outline" className="h-7 rounded-full px-2.5 text-[11px]" onClick={stop}>
                <Pause className="mr-1 h-3 w-3" />
                Pause
              </Button>
            ) : null}
            {status === "paused" || status === "error" ? (
              <Button type="button" size="sm" variant="outline" className="h-7 rounded-full px-2.5 text-[11px]" onClick={resume}>
                <Play className="mr-1 h-3 w-3" />
                Resume
              </Button>
            ) : null}
            {status === "done" || currentUrl ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 rounded-full px-2.5 text-[11px]"
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                    inputRef.current.click();
                  }
                }}
              >
                Change
              </Button>
            ) : null}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 rounded-full px-2.5 text-[11px] text-red-600"
              onClick={remove}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Remove
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AttachmentManager({
  items,
  onChange,
  onUpload,
  onBusyChange,
}: {
  items: ComposerAttachment[];
  onChange: (
    next: ComposerAttachment[] | ((prev: ComposerAttachment[]) => ComposerAttachment[])
  ) => void;
  onUpload: UploadFn;
  onBusyChange?: (id: string, busy: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: File[]) => {
    const additions: ComposerAttachment[] = files.map((file) => ({
      title: file.name,
      url: "",
      fileLabel: file.name,
      fileType: (file.name.split(".").pop() || "file").toUpperCase(),
      sizeLabel: formatBytes(file.size),
      pending: true,
      tempKey: `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      _file: file,
    }));
    onChange((prev) => [...prev, ...additions]);
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={DOCUMENT_ACCEPT}
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          e.target.value = "";
          if (files.length) addFiles(files);
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.click();
          }
        }}
        className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-4 text-xs hover:border-primary/40"
      >
        <FileUp className="h-5 w-5 text-primary" />
        Upload PDF, Excel, PPT, ZIP or DOC
      </button>
      <p className="text-center text-[11px] text-muted-foreground">
        {items.length ? `${items.length} file${items.length === 1 ? "" : "s"}` : "No file selected"}
      </p>
      {items.length ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <AttachmentRow
              key={item.tempKey || `${item.url}-${item.title}-${index}`}
              item={item}
              onUpload={onUpload}
              onBusyChange={onBusyChange}
              onPatch={(patch) =>
                onChange((prev) =>
                  prev.map((row) =>
                    (row.tempKey || row.url) === (item.tempKey || item.url)
                      ? { ...row, ...patch }
                      : row
                  )
                )
              }
              onRemove={() => {
                onBusyChange?.(item.tempKey || String(index), false);
                onChange((prev) =>
                  prev.filter(
                    (row) => (row.tempKey || row.url) !== (item.tempKey || item.url)
                  )
                );
              }}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function AttachmentRow({
  item,
  onUpload,
  onPatch,
  onRemove,
  onBusyChange,
}: {
  item: ComposerAttachment;
  onUpload: UploadFn;
  onPatch: (patch: Partial<ComposerAttachment>) => void;
  onRemove: () => void;
  onBusyChange?: (id: string, busy: boolean) => void;
}) {
  const slotId = item.tempKey || item.url || item.title;
  const abortRef = useRef<AbortController | null>(null);
  const fileRef = useRef<File | null>(item._file || null);
  const resumeRef = useRef<ResumeState | null>(null);
  const [progress, setProgress] = useState(item.url ? 100 : 0);
  const [status, setStatus] = useState<SlotStatus>(
    item.url ? "done" : item.error ? "error" : item.pending ? "uploading" : "idle"
  );
  const started = useRef(false);

  const start = async (next?: File, fromPause = false) => {
    const file = next || fileRef.current;
    if (!file) return;
    fileRef.current = file;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setStatus("uploading");
    if (!fromPause) {
      resumeRef.current = null;
      setProgress(0);
    }
    onPatch({ pending: true, error: undefined });
    onBusyChange?.(slotId, true);
    try {
      const url = await onUpload(file, "document", {
        signal: ac.signal,
        resumeState: fromPause ? resumeRef.current : null,
        onResumeState: (state) => {
          resumeRef.current = state;
        },
        onProgress: (pct) => {
          if (!ac.signal.aborted) setProgress(pct);
        },
      });
      if (ac.signal.aborted) return;
      if (url) {
        resumeRef.current = null;
        setProgress(100);
        setStatus("done");
        onPatch({ url, pending: false, error: undefined, title: file.name, fileLabel: file.name });
      } else {
        setStatus("error");
        onPatch({ pending: false, error: "Upload failed" });
      }
    } catch (err: any) {
      if (err?.name === "AbortError" || ac.signal.aborted) {
        setStatus("paused");
        onPatch({ pending: false, error: "Paused" });
        return;
      }
      setStatus("error");
      onPatch({ pending: false, error: "Upload failed" });
    } finally {
      onBusyChange?.(slotId, false);
    }
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!item.url && fileRef.current) void start(fileRef.current);
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li className="flex items-center gap-3 rounded-lg border border-border/70 bg-background px-3 py-2">
      {status === "uploading" ? (
        <CircularProgress value={progress} spinning size={40} />
      ) : (
        <FileUp className="h-4 w-4 shrink-0 text-primary" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{item.title}</p>
        <p className="text-[11px] text-muted-foreground">
          {[item.fileType, item.sizeLabel, statusLabel(status, progress)].filter(Boolean).join(" · ")}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {status === "uploading" ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-[11px]"
            onClick={() => {
              abortRef.current?.abort();
              setStatus("paused");
              onPatch({ pending: false, error: "Stopped" });
              onBusyChange?.(slotId, false);
            }}
          >
            <Pause className="mr-1 h-3 w-3" />
            Pause
          </Button>
        ) : null}
        {status === "paused" || status === "error" ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-[11px]"
            onClick={() => void start(undefined, true)}
            disabled={!fileRef.current}
          >
            <Play className="mr-1 h-3 w-3" />
            Resume
          </Button>
        ) : null}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-[11px] text-red-600"
          onClick={() => {
            abortRef.current?.abort();
            onBusyChange?.(slotId, false);
            onRemove();
          }}
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Remove
        </Button>
      </div>
    </li>
  );
}


