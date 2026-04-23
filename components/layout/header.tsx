"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import CogniCodeLogo from "@/public/CogniCodeLogo.svg"
import Image from "next/image";
import { SearchBar } from "../ui/SearchBar";

const aboutLinks = [
  { name: "About Us", href: "/about" },
  { name: "Why Choose Us", href: "/why-us" },
  { name: "Latest News & Updates", href: "/news" },
  { name: "Blogs", href: "/blog" },
  // { name: "Admissions", href: "/admissions" },
  // { name: "Thesis Writing", href: "/thesis-writing" },
  // { name: "Synopsis Writing", href: "/synopsis-writing" },
  // { name: "Research Writing", href: "/research-writing" },
  { name: "FAQs", href: "/faqs" },
];

const serviceLinks = [
  { name: "PhD Thesis Writing Services", href: "/services/phd-thesis-writing" },
  { name: "PhD Thesis Writing Assistance", href: "/services/thesis-assistance" },
  { name: "Dissertation Consultation", href: "/services/dissertation-consultation" },
  // { name: "Essay Writing Service", href: "/services/essay-writing" },
  // { name: "Journal Writing Services", href: "/services/journal-writing" },
  { name: "PhD Topic Selection", href: "/services/topic-selection" },
  { name: "PhD Scholar Guidance", href: "/services/scholar-guidance" },
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
  // { name: "Synopsis Writing Services", href: "/services/synopsis-writing" },
  // { name: "Book Writing & Publishing", href: "/services/book-writing" },
  { name: "Latex Editor", href: "/services/latex-editor" },
  { name: "Publishing", href: "/services/publishing" },
];

const globalLinks = [
  { name: "Global Overview", href: "/global" },
  { name: "United Kingdom Support", href: "/global/uk" },
  { name: "United States Support", href: "/global/us" },
  { name: "UAE Support", href: "/global/uae" },
  { name: "University Scholars Support", href: "/university-support" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
  setSearchOpen(false);
}, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 ${searchOpen?"py-[4px]":"py-0"}  sm:px-6 lg:px-8`}>
        <div className="flex  lg:flex-1">
          <Link href="/" className=" p-1.5 flex  items-center gap-2">
            <Image src={CogniCodeLogo} alt="CogniCode Logo" className="w-25" />
          </Link>
        </div>

        {/* Desktop navigation */}
        {!searchOpen ? (
        <div className="hidden lg:flex lg:gap-x-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>

          {/* About Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                pathname.startsWith("/about") ||
                  pathname.startsWith("/why-us") ||
                  pathname.startsWith("/news") ||
                  pathname.startsWith("/admissions") ||
                  pathname.startsWith("/thesis-writing") ||
                  pathname.startsWith("/synopsis-writing") ||
                  pathname.startsWith("/research-writing") ||
                  pathname.startsWith("/faqs")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              About Us
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {aboutLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full cursor-pointer",
                      pathname === link.href && "bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

{/* Services Dropdown */}
<DropdownMenu>
  <DropdownMenuTrigger
    className={cn(
      "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
      pathname.startsWith("/services")
        ? "text-primary"
        : "text-muted-foreground"
    )}
  >
    Services
    <ChevronDown className="h-4 w-4" />
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="start"
    className="w-64 max-h-96 overflow-y-auto"
  >
    <DropdownMenuItem asChild>
      <Link
        href="/services"
        className={cn(
          "w-full cursor-pointer font-semibold",
          pathname === "/services" && "bg-muted"
        )}
      >
        All Services
      </Link>
    </DropdownMenuItem>

    {/* Replaced Separator with Tailwind divider */}
    <div className="my-1 h-px bg-border mx-2" />

    {serviceLinks.map((link) => (
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
          {/* Global Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary outline-none",
                pathname.startsWith("/global") ||
                  pathname.startsWith("/university-support")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Global
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {globalLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "w-full cursor-pointer",
                      pathname === link.href && "bg-muted"
                    )}
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/pricing"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Pricing
          </Link>

          <Link
            href="/samples"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/samples" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Samples
          </Link>

          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contact" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
        </div> ) : (
  <div className="lg:flex hidden flex-[3] px-6">
    <SearchBar compact />
  </div>
)}

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
           {!searchOpen ? (
            <>
         <Button
        variant="ghost"
        size="icon"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>
<Button variant="outline" size="sm" asChild>
        <Link href="/contact" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Get a Quote
        </Link>
      </Button>
      
    </>
  ) : (
    <>
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setSearchOpen(false)}
  >
    <X className="h-5 w-5" />
  </Button>
  <Button variant="outline" size="sm" asChild>
        <Link href="/contact" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Get a Quote
        </Link>
      </Button>
  </>
)}
        </div>

        {/* Mobile menu */}
        <div className="flex w-[100%] lg:hidden">
          {/* Mobile SearchBar always visible */}
<div className="flex flex-1 justify-evenly  items-center lg:hidden px-2">
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
  <SheetContent 
    side="right" 
    className="w-[90vw] max-w-sm sm:w-80 sm:max-w-md p-0"
  >
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
          
          {/* Home Link */}
          <div className="py-2.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80",
                pathname === "/" 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-foreground hover:text-foreground"
              )}
            >
              Home
            </Link>
          </div>

          {/* Accordion Sections */}
          <div className="py-2.5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="about" className="border-none">
                <AccordionTrigger className={cn(
                  "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80 hover:no-underline",
                  "data-[state=open]:bg-muted/80 data-[state=open]:shadow-sm"
                )}>
                  About Us
                </AccordionTrigger>
                <AccordionContent className="pt-3">
                  <div className="ml-4 space-y-1.5 border-l border-border/50 pl-3">
                    {aboutLinks.map((link) => (
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services" className="border-none mt-1">
                <AccordionTrigger className={cn(
                  "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80 hover:no-underline",
                  "data-[state=open]:bg-muted/80 data-[state=open]:shadow-sm"
                )}>
                  Services
                </AccordionTrigger>
                <AccordionContent className="pt-3">
                  <div className="space-y-1.5">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "group block rounded-lg p-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/60 truncate",
                        pathname === "/services"
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-foreground"
                      )}
                    >
                      All Services
                    </Link>
                    {serviceLinks.map((link) => (
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
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="global" className="border-none mt-1">
                <AccordionTrigger className={cn(
                  "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80 hover:no-underline",
                  "data-[state=open]:bg-muted/80 data-[state=open]:shadow-sm"
                )}>
                  Global
                </AccordionTrigger>
                <AccordionContent className="pt-3">
                  <div className="ml-4 space-y-1.5 border-l border-border/50 pl-3">
                    {globalLinks.map((link) => (
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Bottom Links */}
          <div className="py-2.5 space-y-1.5">
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80",
                pathname === "/pricing"
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-foreground"
              )}
            >
              Pricing
            </Link>
            <Link
              href="/samples"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80",
                pathname === "/samples"
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-foreground"
              )}
            >
              Samples
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "group flex w-full items-center rounded-xl p-3 text-base font-semibold leading-6 transition-all duration-200 hover:bg-muted/80",
                pathname === "/contact"
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "text-foreground"
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky CTA Section */}
      <div className="sticky bottom-0 z-10 shrink-0 border-t border-border/50 bg-background/95 px-4 py-6 sm:px-6 backdrop-blur-sm">
        <div className="space-y-3">
          <Button
            className="w-full h-12 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 text-sm font-semibold"
            asChild
            onClick={() => setMobileMenuOpen(false)}
          >
             <Link href="/contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Get a Quote
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </SheetContent>
</Sheet>
        </div>
      </nav>
    </header>
  );
}
