"use client";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Download,
  ZoomIn,
  ZoomOut,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sun,
  Moon,
  Undo,
  Redo,
  Save,
  RefreshCw,
  ArrowRight,
  FileText,
  FileType2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { DocumentProps, PageProps } from "react-pdf";
const Document = dynamic(
  () => import("react-pdf").then((mod) => ({ default: mod.Document })),
  { ssr: false }
) as React.FC<DocumentProps>;
const Page = dynamic(
  () => import("react-pdf").then((mod) => ({ default: mod.Page })),
  { ssr: false }
) as React.FC<PageProps>;
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { oneDark } from "@codemirror/theme-one-dark";
import { undoDepth, redoDepth, undo, redo } from "@codemirror/commands";
import LatexTemplate from "@/app/services/latex-editor/latex-templete";
import { postData } from "@/app/server/fetch-beckend-services";

type OutputFormat = "pdf" | "docx";

export default function LatexEditorPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState(LatexTemplate);

  // Active preview format. PDF and DOCX both render as PDF (DOCX preview comes
  // from the server already converted via LibreOffice).
  const [format, setFormat] = useState<OutputFormat>("pdf");

  // Per-format preview URLs (both are PDFs in the browser)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [docxPreviewUrl, setDocxPreviewUrl] = useState<string | null>(null);

  // For downloading the actual DOCX file when user clicks Download in DOCX mode.
  const [docxDownloadUrl, setDocxDownloadUrl] = useState<string | null>(null);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [lastCompiled, setLastCompiled] = useState<{ pdf: string; docx: string }>({
    pdf: "",
    docx: "",
  });

  const [isCompiling, setIsCompiling] = useState(false);
  const [isPreparingDocx, setIsPreparingDocx] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scale, setScale] = useState(1.0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const activePreviewUrl = format === "pdf" ? pdfUrl : docxPreviewUrl;

  // Load saved code
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem("latexCode");
      if (savedCode) setCode(savedCode);
    }
  }, []);

  // PDF.js worker
  useEffect(() => {
    import("react-pdf").then((mod) => {
      const { pdfjs } = mod;
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  // Persist code
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("latexCode", code);
      setIsModified(code !== LatexTemplate);
    }
  }, [code]);

  // CodeMirror setup
  useEffect(() => {
    if (editorRef.current) {
      if (viewRef.current) viewRef.current.destroy();

      const colors = isDarkMode
        ? {
            bg: "oklch(0.20 0.03 240)",
            fg: "oklch(0.95 0.02 240)",
            gutterBg: "oklch(0.15 0.03 240)",
            gutterFg: "oklch(0.70 0.04 240)",
            border: "oklch(0.28 0.05 245)",
            cursor: "oklch(0.75 0.14 230)",
            selection: "oklch(0.32 0.06 245)",
            matchingBracket: "rgba(117, 179, 255, 0.25)",
            activeLine: "rgba(117, 179, 255, 0.08)",
          }
        : {
            bg: "oklch(0.98 0.01 235)",
            fg: "oklch(0.20 0.04 235)",
            gutterBg: "oklch(0.95 0.02 235)",
            gutterFg: "oklch(0.50 0.05 240)",
            border: "oklch(0.90 0.03 235)",
            cursor: "oklch(0.55 0.18 250)",
            selection: "oklch(0.65 0.20 250)",
            matchingBracket: "rgba(3, 102, 214, 0.2)",
            activeLine: "rgba(235, 240, 245, 0.5)",
          };

      const dynamicTheme = EditorView.theme({
        "&": {
          height: "100%",
          fontSize: "14px",
          fontFamily:
            "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace",
          backgroundColor: colors.bg,
          color: colors.fg,
          transition: "background-color 0.3s, color 0.3s",
        },
        ".cm-scroller": { overflow: "auto", lineHeight: "1.5", fontFamily: "inherit" },
        ".cm-gutters": {
          backgroundColor: colors.gutterBg,
          color: colors.gutterFg,
          border: "none",
          borderRight: `1px solid ${colors.border}`,
          paddingRight: "8px",
          minWidth: "40px",
        },
        ".cm-lineNumbers .cm-gutterElement": {
          paddingRight: "8px",
          cursor: "default",
          display: "flex",
          justifyContent: "flex-end",
        },
        ".cm-activeLine": { backgroundColor: colors.activeLine ?? "transparent" },
        ".cm-activeLineGutter": {
          backgroundColor: "transparent",
          color: isDarkMode ? "oklch(0.75 0.14 230)" : "oklch(0.55 0.18 250)",
          fontWeight: "600",
        },
        ".cm-cursor": { borderLeftColor: colors.cursor, borderLeftWidth: "2px" },
        ".cm-selectionBackground, ::selection": {
          backgroundColor: `${colors.selection} !important`,
        },
        ".cm-matchingBracket": {
          backgroundColor: colors.matchingBracket,
          fontWeight: "bold",
          color: isDarkMode ? "oklch(0.75 0.14 230)" : "oklch(0.55 0.18 250)",
        },
        ".cm-content": { paddingBottom: "50vh" },
      });

      const extensions = [
        basicSetup,
        EditorView.lineWrapping,
        StreamLanguage.define(stex),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) setCode(update.state.doc.toString());
          setCanUndo(undoDepth(update.state) > 0);
          setCanRedo(redoDepth(update.state) > 0);
        }),
        dynamicTheme,
      ];
      if (isDarkMode) extensions.push(oneDark);

      const state = EditorState.create({ doc: code, extensions });
      const view = new EditorView({ state, parent: editorRef.current });
      viewRef.current = view;
      setCanUndo(undoDepth(view.state) > 0);
      setCanRedo(redoDepth(view.state) > 0);
    }
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [isDarkMode]);

  // PDF text → editor sync
  useEffect(() => {
    let isHandling = false;
    const handleSelectionChange = () => {
      if (isHandling) return;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (
          previewRef.current &&
          previewRef.current.contains(range.commonAncestorContainer)
        ) {
          const selectedText = selection.toString().trim();
          if (selectedText && viewRef.current) {
            const pos = code.indexOf(selectedText);
            if (pos !== -1) {
              isHandling = true;
              viewRef.current.dispatch({
                selection: { anchor: pos, head: pos + selectedText.length },
                scrollIntoView: true,
              });
              isHandling = false;
            }
          }
        }
      }
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [code]);

// Zoom: Ctrl+wheel, trackpad pinch (wheel with ctrlKey), and 2-finger touch pinch
useEffect(() => {
  const el = previewRef.current;
  if (!el) return;

  // Ctrl/trackpad-pinch (browsers report trackpad pinch as wheel + ctrlKey)
  const handleWheel = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale((s) => Math.min(3.0, Math.max(0.4, +(s + delta).toFixed(2))));
  };

  // Touch pinch
  let initialDistance = 0;
  let initialScale = 1;
  const distance = (t1: Touch, t2: Touch) =>
    Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      initialDistance = distance(e.touches[0], e.touches[1]);
      setScale((s) => {
        initialScale = s;
        return s;
      });
    }
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && initialDistance > 0) {
      e.preventDefault();
      const newDistance = distance(e.touches[0], e.touches[1]);
      const ratio = newDistance / initialDistance;
      const next = Math.min(3.0, Math.max(0.4, +(initialScale * ratio).toFixed(2)));
      setScale(next);
    }
  };
  const handleTouchEnd = () => { initialDistance = 0; };

  el.addEventListener("wheel", handleWheel, { passive: false });
  el.addEventListener("touchstart", handleTouchStart, { passive: true });
  el.addEventListener("touchmove", handleTouchMove, { passive: false });
  el.addEventListener("touchend", handleTouchEnd, { passive: true });

  return () => {
    el.removeEventListener("wheel", handleWheel);
    el.removeEventListener("touchstart", handleTouchStart);
    el.removeEventListener("touchmove", handleTouchMove);
    el.removeEventListener("touchend", handleTouchEnd);
  };
}, []);

// Keyboard shortcuts: Ctrl/Cmd +, -, 0
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      setScale((s) => Math.min(3.0, +(s + 0.1).toFixed(2)));
    } else if (e.key === "-") {
      e.preventDefault();
      setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)));
    } else if (e.key === "0") {
      e.preventDefault();
      setScale(1.0);
    }
  };
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);

  // Keyboard shortcuts: Ctrl/Cmd +, -, 0
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setScale((s) => Math.min(3.0, +(s + 0.1).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)));
      } else if (e.key === "0") {
        e.preventDefault();
        setScale(1.0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Compile preview for the requested format. PDF mode hits format=pdf;
  // DOCX mode hits format=docx-preview which returns a PDF rendered by
  // LibreOffice from the actual DOCX (true-to-Word).
  const compilePreview = async (latexCode: string, fmt: OutputFormat) => {
    setIsCompiling(true);
    setErrorMessage("");

    try {
      const blob = await postData(
        "users/compile-latex",
        { latexCode, format: fmt === "pdf" ? "pdf" : "docx-preview" },
        "blob"
      );
      if (!blob) {
        setErrorMessage("Compilation failed");
        return;
      }
      const url = URL.createObjectURL(blob);
      if (fmt === "pdf") {
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } else {
        setDocxPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      }
      setLastCompiled((prev) => ({ ...prev, [fmt]: latexCode }));
    } catch (error: any) {
      setErrorMessage(error?.message || "Network error");
    } finally {
      setIsCompiling(false);
    }
  };

  // First load
  useEffect(() => {
    compilePreview(code, "pdf");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveAndCompile = () => compilePreview(code, format);

  const handleFormatChange = async (next: OutputFormat) => {
    if (next === format) return;
    setFormat(next);
    if (lastCompiled[next] !== code) {
      await compilePreview(code, next);
    }
  };

  const handleDownload = async () => {
    setErrorMessage("");

    if (format === "pdf") {
      if (code !== lastCompiled.pdf || !pdfUrl) {
        await compilePreview(code, "pdf");
      }
      if (pdfUrl) {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "document.pdf";
        a.click();
      }
      return;
    }

    // DOCX download: fetch the real .docx file (separate from preview PDF)
    setIsPreparingDocx(true);
    try {
      const blob = await postData(
        "users/compile-latex",
        { latexCode: code, format: "docx" },
        "blob"
      );
      if (!blob) {
        setErrorMessage("DOCX export failed");
        return;
      }
      const url = URL.createObjectURL(blob);
      setDocxDownloadUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.docx";
      a.click();
    } catch (error: any) {
      setErrorMessage(error?.message || "DOCX export failed");
    } finally {
      setIsPreparingDocx(false);
    }
  };

  const handleUndo = () => {
    if (viewRef.current) { undo(viewRef.current); viewRef.current.focus(); }
  };
  const handleRedo = () => {
    if (viewRef.current) { redo(viewRef.current); viewRef.current.focus(); }
  };
  const handleReset = () => {
    if (viewRef.current) {
      const transaction = viewRef.current.state.update({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: LatexTemplate },
      });
      viewRef.current.dispatch(transaction);
      viewRef.current.focus();
      compilePreview(LatexTemplate, format);
    }
  };

  const hasChanges = code !== lastCompiled[format];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                LaTeX to PDF / DOCX Converter
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Write, compile, and preview professional academic documents in
                real-time. Export as PDF or Word.
              </p>
            </div>
          </div>
        </section>

        {/* Editor */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="flex w-full overflow-hidden rounded-3xl shadow-2xl border border-border bg-card"
              style={{ height: "720px" }}
            >
              {/* LEFT: Editor */}
              <div className="w-1/2 flex flex-col border-r border-border bg-card relative rounded-tl-3xl rounded-bl-3xl overflow-hidden">
                <div className="w-full h-12 border-b border-border bg-muted text-muted-foreground flex items-center px-4 justify-between z-10">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-2 text-foreground">
                      <span className={`w-2 h-2 rounded-full ${isCompiling ? "bg-amber-500 animate-pulse" : hasChanges ? "bg-emerald-500" : "bg-muted-foreground"}`} />
                      Main.tex
                    </span>
                    <div className="flex items-center gap-1 border-l pl-4 border-border">
                      <button onClick={canUndo ? handleUndo : undefined} disabled={!canUndo}
                        className={`p-1.5 rounded transition-colors ${canUndo ? "hover:bg-accent text-foreground" : "cursor-not-allowed text-muted-foreground opacity-50"}`}
                        title="Undo (Ctrl+Z)"><Undo size={14} /></button>
                      <button onClick={canRedo ? handleRedo : undefined} disabled={!canRedo}
                        className={`p-1.5 rounded transition-colors ${canRedo ? "hover:bg-accent text-foreground" : "cursor-not-allowed text-muted-foreground opacity-50"}`}
                        title="Redo (Ctrl+Y)"><Redo size={14} /></button>
                      <button onClick={isModified ? handleReset : undefined} disabled={!isModified}
                        className={`p-1.5 rounded transition-colors ${isModified ? "hover:bg-accent text-foreground" : "cursor-not-allowed text-muted-foreground opacity-50"}`}
                        title="Reset Template"><RefreshCw size={14} /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={!isCompiling && hasChanges ? handleSaveAndCompile : undefined}
                      disabled={isCompiling || !hasChanges}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold tracking-wide transition-all
                        ${isCompiling || !hasChanges
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                    >
                      {isCompiling ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                      Save &amp; Compile
                    </button>
                    <div className="h-4 w-[1px] bg-border mx-1"></div>
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="p-1.5 cursor-pointer rounded-md hover:bg-accent"
                      title="Toggle Theme"
                    >
                      {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                  </div>
                </div>
                <div className="w-full flex-1 overflow-hidden relative bg-card">
                  <div ref={editorRef} className="h-full text-base text-left" />
                </div>
              </div>

              {/* RIGHT: Preview */}
              <div className="w-1/2 flex flex-col relative rounded-tr-3xl rounded-br-3xl overflow-hidden bg-muted">
                <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shadow-md z-10 text-foreground gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {isCompiling ? (
                      <div className="flex items-center text-amber-500 text-xs font-medium gap-2">
                        <Loader2 className="animate-spin" size={14} /> Compiling...
                      </div>
                    ) : errorMessage ? (
                      <div className="flex items-center text-destructive text-xs font-medium gap-2">
                        <AlertCircle size={14} /> Error
                      </div>
                    ) : (
                      <div className="flex items-center text-emerald-500 text-xs font-medium gap-2">
                        <CheckCircle size={14} /> Ready
                      </div>
                    )}
                  </div>

                  {/* Format toggle */}
                  <div className="flex items-center bg-muted rounded gap-1 p-0.5 border border-border">
                    <button
                      onClick={() => handleFormatChange("pdf")}
                      disabled={isCompiling}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        format === "pdf"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent"
                      } ${isCompiling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      title="View as PDF"
                    >
                      <FileText size={13} /> PDF
                    </button>
                    <button
                      onClick={() => handleFormatChange("docx")}
                      disabled={isCompiling}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        format === "docx"
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent"
                      } ${isCompiling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      title="View as DOCX"
                    >
                      <FileType2 size={13} /> DOCX
                    </button>
                  </div>

                  {/* Zoom */}
                  <div className="flex items-center bg-muted rounded gap-1 p-0.5 border border-border">
                    <button
                      onClick={() => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)))}
                      className="p-1.5 hover:bg-accent rounded text-foreground"
                      title="Zoom out (Ctrl+-)"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <button
                      onClick={() => setScale(1.0)}
                      className="text-[10px] font-semibold text-muted-foreground hover:text-foreground hover:bg-accent rounded px-1 min-w-[42px] text-center select-none transition-colors"
                      title="Reset zoom (Ctrl+0)"
                    >
                      {Math.round(scale * 100)}%
                    </button>
                    <div className="h-4 w-[1px] bg-border" />
                    <button
                      onClick={() => setScale((s) => Math.min(3.0, +(s + 0.1).toFixed(2)))}
                      className="p-1.5 hover:bg-accent rounded text-foreground"
                      title="Zoom in (Ctrl++)"
                    >
                      <ZoomIn size={14} />
                    </button>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={isCompiling || isPreparingDocx}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold tracking-wide transition-all hover:bg-accent text-foreground ${
                      isCompiling || isPreparingDocx ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                  >
                    {isPreparingDocx ? <Loader2 className="animate-spin" size={14} /> : <Download size={14} />}
                    {format.toUpperCase()}
                  </button>
                </div>

                {/* Unified PDF preview (PDF mode = pdflatex output, DOCX mode = LibreOffice-rendered) */}
              <div
  ref={previewRef}
  className="flex-1 overflow-auto flex justify-center custom-scrollbar bg-muted m-2 select-text"
  style={{ touchAction: "pan-x pan-y" }}  // ← removed "pinch-zoom"
>
                  {activePreviewUrl ? (
                    <Document
                      file={activePreviewUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      loading={
                        <div className="flex flex-col items-center mt-32 text-muted-foreground">
                          <Loader2 className="animate-spin text-2xl mb-2" />
                        </div>
                      }
                      error={
                        <div className="mt-20 text-destructive flex flex-col items-center gap-2">
                          <AlertCircle size={24} />
                          <span className="text-sm">Could not load preview</span>
                        </div>
                      }
                      className="flex flex-col gap-4 select-text py-2"
                    >
                      {Array.from(new Array(numPages), (_, index) => (
                        <div
                          key={`${format}-${index}`}
                          style={{
                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                            transition: "transform 0.1s ease-out",
                          }}
                          className="select-text"
                        >
                          <Page
                            pageNumber={index + 1}
                            scale={scale}
                            renderTextLayer
                            renderAnnotationLayer
                            devicePixelRatio={Math.max(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1)}
                            className="bg-card select-text"
                          />
                        </div>
                      ))}
                    </Document>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 text-muted-foreground">
                      <div className="w-20 h-28 border-2 border-dashed border-border rounded flex items-center justify-center mb-4">
                        <span className="font-bold text-[10px]">EMPTY</span>
                      </div>
                      <p className="text-xs tracking-widest uppercase">No Preview Yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Need Expert LaTeX Help?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Our PhD-qualified writers can review, refine, or fully create
                your LaTeX document. Get a personalized quote today.
              </p>
              <div className="mt-10">
                <Button size="lg" variant="secondary" asChild>
                  <Link prefetch={false} href="/contact">
                    Get Expert Help
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}