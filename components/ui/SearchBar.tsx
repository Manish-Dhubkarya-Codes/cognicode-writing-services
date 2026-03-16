"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { searchProject } from "@/lib/search-engine";
import { Search, ArrowRight, X } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const results = searchProject(query);

  // Example logic for a keyboard shortcut visual
  const [isMac, setIsMac] = useState(true);
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      {/* Animated Glow Backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-2xl blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

      {/* Input Container */}
      <div className="relative flex items-center bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-1.5 shadow-2xl transition-all duration-300 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
        <div className="pl-4 text-muted-foreground/70">
          <Search size={20} strokeWidth={2} />
        </div>
        
        <input
          type="text"
          placeholder="Search services, thesis help..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 text-base outline-none bg-transparent placeholder:text-muted-foreground/50 text-foreground"
        />

        {/* Keyboard Hint - shows only when empty */}
        

        {/* Clear (X) Button - shows only when typing */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mr-2 p-3 text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-xl transition-all active:scale-95"
            title="Clear search"
          >
            <X size={20} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {query && (
        <div className="absolute top-full left-0 w-full mt-3 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-card/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] overflow-hidden">
            
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {results.length > 0 ? (
                <div className="p-2">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    Matches Found
                  </div>
                  {results.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 transition-all border border-transparent hover:border-primary/10 mb-1"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground leading-none">
                            {item.title}
                          </h4>
                          <span className="opacity-0 group-hover/item:opacity-100 transition-all scale-90 group-hover/item:scale-100 text-[10px] font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded">
                            GO
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <ArrowRight size={14} className="text-primary" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center">
                  <div className="relative mb-4">
                    <Search className="text-muted/40" size={40} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-card" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    No results for <span className="text-primary">"{query}"</span>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-secondary/50 px-4 py-2.5 border-t border-border/40 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                  {results.length} results indexed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}