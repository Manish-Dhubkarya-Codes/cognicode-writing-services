"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, X, GraduationCap, Phone, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import CogniCodeLogo from "@/public/CogniCode_Old.png";
import Image from "next/image";
import { SearchBar } from "../ui/SearchBar";

// ==================== SINGLE SOURCE OF TRUTH ====================
// All navigation is defined in ONE place. Both desktop & mobile use .map()

const aboutLinks = [
  { name: "About Us", href: "/about" },
  { name: "Why Choose Us", href: "/why-us" },
  { name: "Latest News & Updates", href: "/news" },
  { name: "Blogs", href: "/blog" },
  { name: "FAQs", href: "/faqs" },
] as const;

const dataDrivenLinks = [
  { name: "Artificial Intelligence & Machine Learning", href: "/services/ai-ml" },
  { name: "Computer Vision", href: "/services/computer-vision" },
  { name: "Natural Language Processing (NLP)", href: "/services/natural-language-processing" },
  { name: "Statistical Analysis & Data Analytics", href: "/services/statistical-analysis-data-analytics" },
  { name: "Data Science & Big Data", href: "/services/ds-big-data" },
  { name: "Tools & Technologies", href: "/services/tools-technologies" },
] as const;

const writingServiceLinks = [
  { name: "PhD Thesis Writing Services", href: "/services/phd-thesis-writing" },
  { name: "PhD Thesis Writing Assistance", href: "/services/thesis-assistance" },
  { name: "Dissertation Consultation", href: "/services/dissertation-consultation" },
  { name: "PhD Topic Selection", href: "/services/topic-selection" },
  // { name: "PhD Scholar Guidance", href: "/services/scholar-guidance" },
  { name: "PhD Consultation Services", href: "/services/phd-consultation" },
  { name: "Coding & Implementation", href: "/services/coding-implementation" },
  { name: "Research Paper Writing", href: "/services/research-paper-writing" },
  { name: "Research Proposal Writing", href: "/services/research-proposal" },
  { name: "Research Consultation", href: "/services/research-consultation" },
  { name: "Article Writing Services", href: "/services/article-writing" },
  { name: "Research Report Writing", href: "/services/research-report" },
  { name: "Conference Paper Writing", href: "/services/conference-paper" },
  { name: "Proofreading & Editing", href: "/services/proofreading-editing" },
  { name: "Scopus Paper Writing", href: "/services/scopus-paper" },
  { name: "Literature Review Writing", href: "/services/literature-review" },
  { name: "Review Paper Writing", href: "/services/review-paper" },
  { name: "Plagiarism Check & Removal", href: "/services/plagiarism-removal" },
  { name: "Latex Editor", href: "/services/latex-editor" },
  { name: "Publishing", href: "/services/publishing" },
] as const;

const globalLinks = [
  { name: "Global Overview", href: "/global" },
  { name: "United Kingdom Support", href: "/global/uk" },
  { name: "United States Support", href: "/global/us" },
  { name: "UAE Support", href: "/global/uae" },
  { name: "Canada", href: "/global/canada" },
  { name: "Australia", href: "/global/australia" },
  { name: "Germany", href: "/global/germany" },
  { name: "University Scholars Support", href: "/university-support" },
] as const;

// Central navigation configuration (add/remove/reorder here only)
const navigationConfig = [
  { id: "home", label: "Home", type: "link", href: "/" } as const,
  { id: "about", label: "About Us", type: "dropdown", items: aboutLinks } as const,
  { id: "data-driven", label: "Data Driven Services", type: "dropdown", items: dataDrivenLinks } as const,
  {
    id: "writing",
    label: "Writing Services",
    type: "dropdown",
    items: writingServiceLinks,
    allItem: { name: "All Writing Services", href: "/services" } as const,
  } as const,
  { id: "samples", label: "Samples", type: "link", href: "/samples" } as const,
  { id: "pricing", label: "Pricing", type: "link", href: "/pricing" } as const,
  { id: "global", label: "Global Services", type: "dropdown", items: globalLinks } as const,
  // { id: "contact", label: "Contact", type: "link", href: "/contact" } as const,
] as const;

type NavItem = typeof navigationConfig[number];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  // Dynamic active state checker
  const isActive = (item: NavItem): boolean => {
    if (item.type === "link") return pathname === item.href;

    if (item.id === "about") {
      return pathname.startsWith("/about") ||
             pathname.startsWith("/why-us") ||
             pathname.startsWith("/news") ||
             pathname.startsWith("/blog") ||
             pathname.startsWith("/faqs");
    }
    if (item.id === "data-driven") {
      return dataDrivenLinks.some((l) => pathname === l.href);
    }
    if (item.id === "writing") {
      return pathname === "/services" || writingServiceLinks.some((l) => pathname === l.href);
    }
    if (item.id === "global") {
      return pathname.startsWith("/global") || pathname.startsWith("/university-support");
    }
    return false;
  };

  // Separate sections for mobile rendering
  const dropdownSections = navigationConfig.filter((item) => item.type === "dropdown");
  const flatLinks = navigationConfig.filter((item) => item.type === "link" && item.id !== "home");

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 ${searchOpen ? "py-[4px]" : "py-0"} sm:px-6 lg:px-8`}>
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="p-1.5 flex items-center gap-2">
            <Image
      src={CogniCodeLogo}
      alt="CogniCode Logo"
      className="w-30 select-none"
      draggable={false}
    />
          </Link>
        </div>

        {/* ====================== DESKTOP NAV ====================== */}
        {!searchOpen ? (
          <div className="hidden lg:flex cursor-pointer lg:gap-x-6">
            {navigationConfig.map((item) => {
              if (item.type === "link") {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
  "relative text-sm font-medium transition-colors hover:text-primary",
  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary",
  "after:transition-all after:duration-300 hover:after:w-full",
  isActive(item)
    ? "text-primary after:w-full"
    : "text-muted-foreground"
)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger
                    className={cn(
                      "flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                      isActive(item) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start" className="w-64 max-h-96 overflow-y-auto">
                    {/* Only Writing Services has "All Writing Services" + divider */}
                    {'allItem' in item && item.allItem && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href={item.allItem.href}
                            className={cn(
                              "w-full cursor-pointer font-semibold",
                              pathname === item.allItem.href && "bg-muted"
                            )}
                          >
                            {item.allItem.name}
                          </Link>
                        </DropdownMenuItem>
                        <div className="my-1 h-px bg-border mx-2" />
                      </>
                    )}

                    {item.items.map((link) => (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            "w-full cursor-pointer text-sm",
                            pathname === link.href && "bg-muted"
                          )}
                        >
                          {link.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </div>
        ) : (
          <div className="lg:flex hidden flex-[3] px-6">
            <SearchBar compact />
          </div>
        )}

        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {!searchOpen ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact" className="flex bg-white items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Get a Quote
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact" className="flex bg-white items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Get a Quote
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* ====================== MOBILE MENU ====================== */}
        <div className="flex w-[100%] lg:hidden">
          <div className="flex flex-1 justify-evenly items-center lg:hidden px-2">
            <div className="md:w-[70%] w-[90%]">
              <SearchBar compact />
            </div>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mx-2 h-10 w-10 p-0">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[90vw] max-w-sm sm:w-80 sm:max-w-md p-0">
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/50 bg-background/95 px-4 sm:px-6 backdrop-blur-sm">
                <Link
                  href="/"
                  className="flex items-center gap-3 -m-1 p-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-serif text-xl font-bold tracking-tight sm:text-lg">
                    CogniCode
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 p-0 -m-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div className="flex h-[calc(100%-4rem)] flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="-my-2.5 divide-y divide-border/50">
                    {/* Home */}
                    <div className="py-2.5">
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80",
                          pathname === "/" ? "bg-primary/10 text-primary shadow-sm" : "text-foreground hover:text-foreground"
                        )}
                      >
                        Home
                      </Link>
                    </div>

                    {/* Dropdown sections via .map() */}
                    <div className="py-2.5">
                      <Accordion type="single" collapsible className="w-full">
                        {dropdownSections.map((item) => (
                          <AccordionItem key={item.id} value={item.id} className="border-none mt-1">
                            <AccordionTrigger
                              className={cn(
                                "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80 hover:no-underline",
                                "data-[state=open]:bg-muted/80 data-[state=open]:shadow-sm"
                              )}
                            >
                              {item.label}
                            </AccordionTrigger>

                            <AccordionContent className="pt-3">
                              {/* Special handling for Writing Services */}
                              {'allItem' in item && item.allItem ? (
                                <div className="space-y-1.5">
                                  <Link
                                    href={item.allItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      "group block rounded-lg p-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/60 truncate",
                                      pathname === item.allItem.href
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-foreground"
                                    )}
                                  >
                                    {item.allItem.name}
                                  </Link>
                                  {item.items.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={cn(
                                        "group block rounded-lg p-2.5 text-sm transition-all duration-200 hover:bg-muted/60 truncate",
                                        pathname === link.href
                                          ? "bg-primary/10 text-primary border border-primary/20"
                                          : "text-muted-foreground"
                                      )}
                                    >
                                      {link.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                /* Normal dropdowns */
                                <div className="ml-4 space-y-1.5 border-l border-border/50 pl-3">
                                  {item.items.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={cn(
                                        "group block rounded-lg p-2.5 text-sm transition-all duration-200 hover:bg-muted/60 truncate",
                                        pathname === link.href
                                          ? "bg-primary/10 text-primary border border-primary/20"
                                          : "text-muted-foreground"
                                      )}
                                    >
                                      {link.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>

                    {/* Flat links (Samples, Pricing, Contact) */}
                    <div className="py-2.5 space-y-1.5">
                      {flatLinks.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80",
                            isActive(item) ? "bg-primary/10 text-primary shadow-sm" : "text-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sticky CTA */}
                <div className="sticky bottom-0 z-10 shrink-0 border-t border-border/50 bg-background/95 px-4 py-6 sm:px-6 backdrop-blur-sm">
                  <Button
                    className="w-full h-12 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-sm font-semibold"
                    asChild
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/contact" className="flex bg-white items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Get a Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}