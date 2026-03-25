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
  { name: "Admissions", href: "/admissions" },
  { name: "Thesis Writing", href: "/thesis-writing" },
  { name: "Synopsis Writing", href: "/synopsis-writing" },
  { name: "Research Writing", href: "/research-writing" },
  { name: "FAQs", href: "/faqs" },
];

const serviceLinks = [
  { name: "PhD Thesis Writing Services", href: "/services/phd-thesis-writing" },
  { name: "PhD Thesis Writing Assistance", href: "/services/thesis-assistance" },
  { name: "Dissertation Consultation", href: "/services/dissertation-consultation" },
  { name: "Essay Writing Service", href: "/services/essay-writing" },
  { name: "Journal Writing Services", href: "/services/journal-writing" },
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
  { name: "Synopsis Writing Services", href: "/services/synopsis-writing" },
  { name: "Book Writing & Publishing", href: "/services/book-writing" },
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-4 ${searchOpen?"py-[13px]":"py-4"}  sm:px-6 lg:px-8`}>
        <div className="flex  lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex  items-center gap-2">
            <Image src={CogniCodeLogo} alt="CogniCode Logo" className="w-15" />

            <span className="font-serif text-xl font-bold text-foreground">
              CogniCodeWrite
            </span>
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
              <DropdownMenuSeparator />
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
  <div className="hidden lg:flex flex-[3] px-6">
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

      <Button size="sm" asChild>
        <Link href="/contact">Get Started</Link>
      </Button>
    </>
  ) : (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setSearchOpen(false)}
  >
    <X className="h-5 w-5" />
  </Button>
)}
        </div>

        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-m-2.5">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="-m-1.5 p-1.5 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <GraduationCap className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-serif text-lg font-bold">
                    CogniCodeWrite
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-m-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="py-6">
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted",
                        pathname === "/" ? "text-primary bg-muted" : "text-foreground"
                      )}
                    >
                      Home
                    </Link>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="about" className="border-none">
                        <AccordionTrigger className="-mx-3 px-3 py-2 text-base font-semibold leading-7 hover:bg-muted hover:no-underline rounded-lg">
                          About Us
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-4 space-y-1">
                            {aboutLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm hover:bg-muted",
                                  pathname === link.href
                                    ? "text-primary bg-muted"
                                    : "text-muted-foreground"
                                )}
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="services" className="border-none">
                        <AccordionTrigger className="-mx-3 px-3 py-2 text-base font-semibold leading-7 hover:bg-muted hover:no-underline rounded-lg">
                          Services
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-4 space-y-1 max-h-64 overflow-y-auto">
                            <Link
                              href="/services"
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
                                pathname === "/services"
                                  ? "text-primary bg-muted"
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
                                  "block rounded-lg px-3 py-2 text-sm hover:bg-muted",
                                  pathname === link.href
                                    ? "text-primary bg-muted"
                                    : "text-muted-foreground"
                                )}
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="global" className="border-none">
                        <AccordionTrigger className="-mx-3 px-3 py-2 text-base font-semibold leading-7 hover:bg-muted hover:no-underline rounded-lg">
                          Global
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="ml-4 space-y-1">
                            {globalLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm hover:bg-muted",
                                  pathname === link.href
                                    ? "text-primary bg-muted"
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

                    <Link
                      href="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted",
                        pathname === "/pricing"
                          ? "text-primary bg-muted"
                          : "text-foreground"
                      )}
                    >
                      Pricing
                    </Link>

                    <Link
                      href="/samples"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted",
                        pathname === "/samples"
                          ? "text-primary bg-muted"
                          : "text-foreground"
                      )}
                    >
                      Samples
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-muted",
                        pathname === "/contact"
                          ? "text-primary bg-muted"
                          : "text-foreground"
                      )}
                    >
                      Contact
                    </Link>
                  </div>
                  <div className="py-6 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/contact" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Get a Quote
                      </Link>
                    </Button>
                    <Button
                      className="w-full"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/contact">Get Started</Link>
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
