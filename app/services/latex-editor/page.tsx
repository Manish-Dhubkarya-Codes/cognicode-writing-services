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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
// 🔥 FIXED: Dynamic imports for react-pdf (fixes DOMMatrix error)
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
// Safe CSS imports
// ✅ Correct imports for react-pdf (works with Next.js + Turbopack)
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
// CodeMirror imports (yeh missing the isliye error aa raha tha)
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { StreamLanguage } from "@codemirror/language";
import { stex } from "@codemirror/legacy-modes/mode/stex";
import { oneDark } from "@codemirror/theme-one-dark";
import { undoDepth, redoDepth, undo, redo } from "@codemirror/commands";
import LatexTemplate from "@/app/services/latex-editor/latex-templete";
import { serverURL } from "@/app/server/fetch-beckend-services";

export default function LatexEditorPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [code, setCode] = useState(LatexTemplate);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [lastCompiled, setLastCompiled] = useState<{ pdf: string }>({ pdf: "" });
  const [isCompiling, setIsCompiling] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [width, setWidth] = useState(1200);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isModified, setIsModified] = useState(false);

  // ✅ Load saved LaTeX from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem("latexCode");
      if (savedCode) {
        setCode(savedCode);
      }
    }
  }, []);

  // ✅ SAFE PDF Worker setup (sirf client pe)
  useEffect(() => {
    import("react-pdf").then((mod) => {
      const { pdfjs } = mod;
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  // Responsive width
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Persist code
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("latexCode", code);
      setIsModified(code !== LatexTemplate);
    }
  }, [code]);

  // Initialize CodeMirror
  useEffect(() => {
    if (editorRef.current) {
      if (viewRef.current) viewRef.current.destroy();

      // ✅ Updated colors to match your project design system (light + dark)
      const colors = isDarkMode
        ? {
            bg: "oklch(0.20 0.03 240)", // --background dark
            fg: "oklch(0.95 0.02 240)", // --foreground dark
            gutterBg: "oklch(0.15 0.03 240)", // --card dark
            gutterFg: "oklch(0.70 0.04 240)", // --muted-foreground
            border: "oklch(0.28 0.05 245)", // --border dark
            cursor: "oklch(0.75 0.14 230)", // --primary dark
            selection: "oklch(0.32 0.06 245)", // --accent dark
            matchingBracket: "rgba(117, 179, 255, 0.25)",
            activeLine: "rgba(117, 179, 255, 0.08)",
          }
        : {
            bg: "oklch(0.98 0.01 235)", // --background light
            fg: "oklch(0.20 0.04 235)", // --foreground light
            gutterBg: "oklch(0.95 0.02 235)", // --muted light
            gutterFg: "oklch(0.50 0.05 240)", // --muted-foreground light
            border: "oklch(0.90 0.03 235)", // --border light
            cursor: "oklch(0.55 0.18 250)", // --primary light
            selection: "oklch(0.65 0.20 250)", // --accent light
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
  }, [isDarkMode]); // ← code bhi add kiya taaki update ho

  // PDF text selection → editor sync
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

  // Compilation
  const executeCompilation = async (latexCode: string) => {
    setIsCompiling(true);
    setErrorMessage("");
    try {
      const response = await fetch(`${serverURL}/users/compile-latex`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latexCode, format: "pdf" }),
      });
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType?.includes("application/pdf")) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
          });
          setLastCompiled({ pdf: latexCode });
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Invalid response from server");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Compilation failed");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Network error");
    } finally {
      setIsCompiling(false);
    }
  };

  useEffect(() => {
    executeCompilation(code);
  }, []);

  const handleSaveAndCompile = () => executeCompilation(code);
  const handleDownload = async () => {
    if (code !== lastCompiled.pdf || !pdfUrl) {
      await executeCompilation(code);
    }
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = "document.pdf";
      a.click();
    }
  };
  const handleUndo = () => {
    if (viewRef.current) {
      undo(viewRef.current);
      viewRef.current.focus();
    }
  };
  const handleRedo = () => {
    if (viewRef.current) {
      redo(viewRef.current);
      viewRef.current.focus();
    }
  };
  const handleReset = () => {
    if (viewRef.current) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: LatexTemplate,
        },
      });
      viewRef.current.dispatch(transaction);
      viewRef.current.focus();
      executeCompilation(LatexTemplate);
    }
  };

  const hasChanges = code !== lastCompiled.pdf;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                LaTeX to PDF Converter
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Write, compile, and preview professional academic documents in
                real-time. Instant PDF output with live preview.
              </p>
            </div>
          </div>
        </section>

        {/* Editor Section */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="flex w-full overflow-hidden rounded-3xl shadow-2xl border border-border bg-card"
              style={{ height: "720px" }}
            >
              {/* LEFT: Code Editor */}
              <div
                className={`w-1/2 flex flex-col border-r transition-colors duration-300 relative rounded-tl-3xl rounded-bl-3xl overflow-hidden
                  ${isDarkMode ? "border-border bg-card" : "border-border bg-card"}`}
              >
                {/* Editor Header */}
                <div
                  className={`w-full h-12 border-b flex items-center px-4 justify-between transition-colors duration-300 z-10
                    ${isDarkMode
                      ? "bg-muted border-border text-muted-foreground"
                      : "bg-muted border-border text-muted-foreground"}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-2 text-foreground">
                      <span
                        className={`w-2 h-2 rounded-full ${isCompiling ? "bg-amber-500 animate-pulse" : hasChanges ? "bg-emerald-500" : "bg-muted-foreground"}`}
                      ></span>
                      Main.tex
                    </span>
                    <div className="flex items-center gap-1 border-l pl-4 border-border">
                      <button
                        onClick={canUndo ? handleUndo : undefined}
                        disabled={!canUndo}
                        className={`p-1.5 rounded transition-colors ${canUndo ? "hover:bg-accent text-foreground" : "cursor-not-allowed text-muted-foreground opacity-50"}`}
                        title="Undo (Ctrl+Z)"
                      >
                        <Undo size={14} />
                      </button>
                      <button
                        onClick={canRedo ? handleRedo : undefined}
                        disabled={!canRedo}
                        className={`p-1.5 rounded transition-colors ${canRedo ? "hover:bg-accent text-foreground" : "cursor-not-allowed text-muted-foreground opacity-50"}`}
                        title="Redo (Ctrl+Y)"
                      >
                        <Redo size={14} />
                      </button>
                      <button
                        onClick={isModified ? handleReset : undefined}
                        disabled={!isModified}
                        className={`p-1.5 rounded transition-colors ${isModified ? "hover:bg-accent text-foreground" : "cursor-not-allowed text-muted-foreground opacity-50"}`}
                        title="Reset to Default Template"
                      >
                        <RefreshCw size={14} />
                      </button>
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
                      className={`p-1.5 cursor-pointer rounded-md transition-all duration-200 hover:bg-accent`}
                      title="Toggle Theme"
                    >
                      {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                  </div>
                </div>
                {/* CodeMirror */}
                <div className="w-full flex-1 overflow-hidden relative bg-card">
                  <div ref={editorRef} className="h-full text-base text-left" />
                </div>
              </div>

              {/* RIGHT: PDF Preview */}
              <div
                className="w-1/2 flex flex-col relative rounded-tr-3xl rounded-br-3xl overflow-hidden bg-muted"
              >
                {/* Preview Toolbar */}
                <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shadow-md z-10 text-foreground">
                  <div className="flex items-center gap-4">
                    {isCompiling ? (
                      <div className="flex items-center text-amber-500 text-xs font-medium gap-2">
                        <Loader2 className="animate-spin" size={14} />
                        Compiling...
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
                  <div className="flex items-center bg-muted rounded gap-1 p-0.5 border border-border">
                    <button
                      onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                      className="p-1.5 cursor-pointer hover:bg-accent rounded transition-colors text-foreground"
                    >
                      <ZoomOut size={14} />
                    </button>
                    <div className="h-4 w-[1px] bg-border"></div>
                    <button
                      onClick={() => setScale((s) => Math.min(2.0, s + 0.1))}
                      className="p-1.5 cursor-pointer hover:bg-accent rounded transition-colors text-foreground"
                    >
                      <ZoomIn size={14} />
                    </button>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={isCompiling}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold tracking-wide transition-all hover:bg-accent text-foreground ${isCompiling ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <Download size={14} /> PDF
                  </button>
                </div>

                {/* Preview Area */}
                <div
                  ref={previewRef}
                  className="flex-1 overflow-y-auto flex justify-center custom-scrollbar bg-muted m-2 select-text"
                >
                  {pdfUrl ? (
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                      loading={
                        <div className="flex flex-col items-center mt-32 text-muted-foreground">
                          <Loader2 className="animate-spin text-2xl mb-2" />
                        </div>
                      }
                      error={
                        <div className="mt-20 text-destructive flex flex-col items-center gap-2">
                          <AlertCircle size={24} />
                          <span className="text-sm">Could not load PDF</span>
                        </div>
                      }
                      className="flex flex-col gap-4 select-text"
                    >
                      {Array.from(new Array(numPages), (_, index) => (
                        <div
                          key={index}
                          style={{
                            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                          className="select-text"
                        >
                          <Page
                            pageNumber={index + 1}
                            scale={scale}
                            renderTextLayer
                            renderAnnotationLayer
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
                      <p className="text-xs tracking-widest uppercase">No PDF Generated Yet</p>
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
                  <Link href="/contact">
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