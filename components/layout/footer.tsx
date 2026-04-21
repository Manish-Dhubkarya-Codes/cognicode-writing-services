import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ExternalLink 
} from "lucide-react";

const footerNavigation = {
  services: [
    { name: "PhD Thesis Writing", href: "/thesis-writing" },
    { name: "Synopsis Writing", href: "/synopsis-writing" },
    { name: "Research Papers", href: "/research-writing" },
    { name: "Plagiarism Removal", href: "/services/plagiarism-removal" },
    { name: "Dissertation Support", href: "/services/dissertation-consultation" },
    { name: "All Services", href: "/services" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Why Choose Us", href: "/why-us" },
    { name: "News & Updates", href: "/news" },
    { name: "Blog", href: "/blog" },
    { name: "Work Samples", href: "/samples" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "FAQs", href: "/faqs" },
    { name: "Admissions", href: "/admissions" },
    { name: "Pricing", href: "/pricing" },
    { name: "University Support", href: "/university-support" },
    { name: "Global Support", href: "/global" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/CogniCode" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/cognicodindia/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/cognicodethesiswriting" },
  { name: "External Link", icon: ExternalLink, href: "https://share.google/SAralwG2DYtufKBQ9" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-background/5" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-6">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary transition-transform group-hover:scale-110">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-background">
                CogniCode
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-background/60">
              Empowering scholars through expert research writing and academic consultation. 
              Precision, integrity, and excellence in every word.
            </p>
            <div className="flex gap-x-5">
              {socialLinks.map((item) => (
                <a
                target="_blank"
                  key={item.name}
                  href={item.href}
                  className="text-background/40 hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-2 gap-8 sm:gap-4 lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-background/90">Services</h3>
              <ul role="list" className="space-y-3">
                {footerNavigation.services.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-background/60 hover:text-primary hover:pl-1 transition-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-background/90">Company</h3>
              <ul role="list" className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-background/60 hover:text-primary hover:pl-1 transition-all">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-background/90 text-center sm:text-left">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Mail className="h-5 w-5 text-primary shrink-0 transition-colors group-hover:text-primary/80" />
                <a href="mailto:office.cognicode@gmail.com" className="text-sm text-background/60 hover:text-background transition-colors">
                  office.cognicode@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="h-5 w-5 text-primary shrink-0 transition-colors group-hover:text-primary/80" />
                <span className="text-sm text-background/60">+917000515617</span>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-primary shrink-0 transition-colors group-hover:text-primary/80" />
                <span className="text-sm text-background/60 leading-snug">
                  B/2, Mahesh Nagar Colony<br />Gwalior, Madhya Pradesh 474002
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-background/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-xs text-background/40">
              &copy; {new Date().getFullYear()} CogniCode. Designed for academic success.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs font-medium text-background/40 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}