"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchProject } from "@/lib/search-engine";
import { Search, ArrowRight, X, Command } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchProject(query);
  const [selectedIndex, setSelectedIndex] = useState(-1);
const router = useRouter();
const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [placeholder, setPlaceholder] = useState(
    "Search services, thesis help..."
  );

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    }

    if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        router.push(results[selectedIndex].href);
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [results, selectedIndex, router]);

useEffect(() => {
  setSelectedIndex(-1);
}, [query]);

useEffect(() => {
  const platform = navigator.platform.toLowerCase();

  if (platform.includes("mac")) {
    setIsMac(true);
  } else {
    setIsMac(false);
  }
}, []);

useEffect(() => {
  if (selectedIndex < 0) return;

  const container = scrollContainerRef.current;
  const item = itemRefs.current[selectedIndex];

  if (!container || !item) return;

  const stickyHeaderHeight = 40; // adjust if needed

  const itemTop = item.offsetTop;
  const itemBottom = itemTop + item.offsetHeight;

  const visibleTop = container.scrollTop + stickyHeaderHeight;
  const visibleBottom = container.scrollTop + container.clientHeight;

  if (itemTop < visibleTop) {
    container.scrollTop = itemTop - stickyHeaderHeight;
  } else if (itemBottom > visibleBottom) {
    container.scrollTop =
      itemBottom - container.clientHeight;
  }
}, [selectedIndex]);

  useEffect(() => {
    const updatePlaceholder = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPlaceholder("Search...");
      }
       else {
        setPlaceholder("Search services, thesis help...");
      }
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

useEffect(() => {
  const handleShortcut = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      inputRef.current?.focus();

      // optional: auto-select first result when opened
      if (results.length > 0) {
        setSelectedIndex(0);
      }
    }
  };

  window.addEventListener("keydown", handleShortcut);

  return () =>
    window.removeEventListener("keydown", handleShortcut);
}, [results]);

  return (
    <div
  className={`relative group ${
    compact
      ? "w-full"
      : "w-full max-w-2xl mx-auto md:px-0"
  }`}
>
      {/* Search Input Container */}
      <div className="relative flex items-center bg-white rounded-full p-[9px] shadow-lg shadow-gray-300/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-sky-200">
        
        {/* Search Icon */}
        <div className="md:pl-4 pl-2 text-gray-400">
          <Search size={20} strokeWidth={2} className="group-focus-within:text-sky-600 transition-colors" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-2 md:px-4 md:text-[14px] lg:text-[16px] text-[12px] outline-none bg-transparent placeholder:text-gray-400 text-gray-800"
        />

        {/* Action Area: Kbd Hint or Clear Button */}
        <div className="flex items-center gap-2 pr-2">
          {!query ? (
            <kbd className="hidden sm:inline-flex select-none items-center gap-1 rounded-full border border-gray-100 bg-sky-50 px-2.5 font-mono text-[11px] font-medium text-sky-700">
              {isMac ? <Command size={11} strokeWidth={3} /> : <span className="text-[10px]">Ctrl</span>}
              <span className="font-bold">K</span>
            </kbd>
          ) : (
            <button
              onClick={() => setQuery("")}
              className=" text-gray-400 cursor-pointer hover:text-red-600 rounded-full transition-all"
              title="Clear search"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown (only visible when typing) */}
      {query && (
        <div className="absolute top-full left-0 w-full mt-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-400/30 overflow-hidden border border-gray-100">
<div className="max-h-[380px] overflow-hidden bg-white rounded-2xl">

  {/* Sticky Header */}
  {results.length > 0 && (
    <div className="sticky top-0 z-20 bg-white px-3 py-2 flex justify-between items-center border-b border-gray-100">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-700">
        Matches Found
      </span>
      <span className="text-xs text-gray-400">
        {results.length} found
      </span>
    </div>
  )}

  {/* Scrollable Results */}
  <div
    ref={scrollContainerRef}
    className="max-h-[330px] overflow-y-auto p-2 custom-scrollbar"
  >
    {results.length > 0 ? (
      results.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className={`group/item flex items-center justify-between p-3.5 rounded-xl transition-all mb-1.5 ${
            selectedIndex === index
              ? "bg-sky-100"
              : "hover:bg-sky-50"
          }`}
        >
          <div className="flex items-start flex-col gap-1">
            <h4 className="font-semibold text-gray-900 group-hover/item:text-sky-700 transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500 line-clamp-1">
              {item.description}
            </p>
          </div>

          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm opacity-0 group-hover/item:opacity-100 group-hover/item:-translate-x-1 transition-all duration-300">
            <ArrowRight size={16} className="text-sky-600" />
          </div>
        </Link>
      ))
    ) : (
      <div className="py-12 text-center flex flex-col items-center gap-3">
        <Search size={32} className="text-gray-300" />
        <p className="text-sm font-medium text-gray-500">
          No results for{" "}
          <span className="font-semibold text-gray-900">
            "{query}"
          </span>
        </p>
      </div>
    )}
  </div>

</div>

            {/* Footer */}
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span className="text-[11px] text-gray-500 italic">
                Press Enter to select a result
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}