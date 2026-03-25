"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchProject } from "@/lib/search-engine";
import { Search, ArrowRight, X, Command } from "lucide-react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchProject(query);

  useEffect(() => {
    // Check OS
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);

    // Keyboard shortcut handler (Cmd+K or Ctrl+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
  className={`relative group ${
    compact
      ? "w-full"
      : "w-full max-w-2xl mx-auto px-4 md:px-0"
  }`}
>
      {/* Search Input Container */}
      <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-lg shadow-gray-300/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-sky-200">
        
        {/* Search Icon */}
        <div className="pl-4 text-gray-400">
          <Search size={20} strokeWidth={2} className="group-focus-within:text-sky-600 transition-colors" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search services, thesis help..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 text-base outline-none bg-transparent placeholder:text-gray-400 text-gray-800"
        />

        {/* Action Area: Kbd Hint or Clear Button */}
        <div className="flex items-center gap-2 pr-2">
          {!query ? (
            <kbd className="hidden md:inline-flex select-none items-center gap-1 rounded-full border border-gray-100 bg-sky-50 px-2.5 py-1.5 font-mono text-[11px] font-medium text-sky-700">
              {isMac ? <Command size={11} strokeWidth={3} /> : <span className="text-[10px]">Ctrl</span>}
              <span className="font-bold">K</span>
            </kbd>
          ) : (
            <button
              onClick={() => setQuery("")}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
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
            <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar">
              {results.length > 0 ? (
                <>
                  <div className="px-3 py-2 mb-1 flex justify-between items-center border-b border-gray-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-700">
                      Matches Found
                    </span>
                    <span className="text-xs text-gray-400">
                      {results.length} found
                    </span>
                  </div>

                  {results.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item flex items-center justify-between p-3.5 rounded-xl hover:bg-sky-50 transition-all mb-1.5"
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
                  ))}
                </>
              ) : (
                <div className="py-12 text-center flex flex-col items-center gap-3">
                  <Search size={32} className="text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">
                    No results for <span className="font-semibold text-gray-900">"{query}"</span>
                  </p>
                </div>
              )}
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