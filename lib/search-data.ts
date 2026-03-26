export type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  content?: string;           // ← Real page text for powerful search
};

export const searchData: SearchItem[] = [
  // ==================== SERVICES ====================
  {
    title: "PhD Thesis Writing Services",
    description: "Complete PhD thesis writing support from topic to final submission with guaranteed quality.",
    href: "/services/phd-thesis-writing",
    keywords: ["phd", "thesis", "writing", "dissertation", "research"],
    content: `Our PhD Thesis Writing Services provide complete support for doctoral scholars. From identifying a research-worthy topic to crafting well-structured chapters, we guide you through every step of your thesis journey. Our team of PhD experts ensures your thesis meets international academic standards and your university requirements.
Complete thesis writing from Chapter 1 to Chapter 6, Research methodology design and implementation, Statistical data analysis using SPSS, R, Python, Literature review with proper citations, Plagiarism-free content with Turnitin report, Unlimited revisions until supervisor approval.`,
  },
  {
    title: "Research Paper Writing Services",
    description: "High-quality research paper writing for Scopus, SCI, and high-impact journals with publication support.",
    href: "/services/research-paper-writing",
    keywords: ["research", "paper", "journal", "scopus", "sci", "publication"],
    content: `Our Research Paper Writing Services help researchers publish their work in reputable journals. From conceptualization to publication, we support you in crafting high-quality research papers that meet journal standards and increase your chances of acceptance.
Complete paper writing, Journal selection guidance, Abstract and introduction writing, Methodology documentation, Results presentation, Discussion and conclusion.`,
  },
  {
    title: "PhD Thesis Writing Assistance",
    description: "Targeted help with specific thesis chapters, methodology, data analysis, or literature review.",
    href: "/services/thesis-assistance",
    keywords: ["thesis", "assistance", "chapter", "methodology", "data analysis"],
    content: `Our PhD Thesis Writing Assistance service is perfect for scholars who need help with specific aspects of their thesis. Whether you need support with literature review, methodology, data analysis, or any specific chapter, our experts provide targeted assistance while you maintain control of your research.
Chapter-specific writing support, Literature review assistance, Methodology guidance, Data analysis support.`,
  },
  {
    title: "Dissertation Consultation Services",
    description: "Strategic guidance and mentorship for Masters and PhD dissertation writing.",
    href: "/services/dissertation-consultation",
    keywords: ["dissertation", "consultation", "guidance", "mentorship"],
    content: `Our Dissertation Consultation Services provide strategic guidance for Masters and PhD students. Get expert advice on structuring your dissertation, refining your research questions, selecting appropriate methodologies, and ensuring academic rigor throughout your work.
Research proposal development, Methodology consultation, Structure and outline planning, Literature review guidance.`,
  },
  {
    title: "Plagiarism Check & Removal Services",
    description: "Turnitin plagiarism check, detailed report, and professional removal with below 10% guarantee.",
    href: "/services/plagiarism-removal",
    keywords: ["plagiarism", "removal", "turnitin", "originality"],
    content: `Our Plagiarism Check & Removal Services ensure your academic work is 100% original. Using industry-standard tools like Turnitin, we identify all instances of similarity and professionally rewrite content to reduce plagiarism while maintaining academic integrity.
Turnitin plagiarism check, Detailed similarity report, Professional paraphrasing, Below 10% similarity guarantee.`,
  },

  // ==================== MAIN PAGES ====================
  {
    title: "About CogniCodeWrite",
    description: "Learn about our 15+ years of experience and mission to support PhD scholars worldwide.",
    href: "/about",
    keywords: ["about", "team", "mission", "vision", "leadership"],
    content: `We are a team of dedicated academic professionals committed to helping scholars achieve their research goals. With over 15 years of experience, we have supported thousands of researchers worldwide.
Our Mission: To empower scholars worldwide by providing expert academic writing support.`,
  },
  {
    title: "Why Choose Us",
    description: "15+ years experience, 12,000+ projects completed, 100% on-time delivery, and 95% success rate.",
    href: "/why-us",
    keywords: ["why us", "reasons", "trust", "quality", "success"],
    content: `Discover why thousands of PhD scholars choose CogniCodeWrite. 15+ Years of Experience, 12,000+ Projects Completed, 100% Original Content, 24/7 Dedicated Support, High Success Rate.`,
  },
  {
    title: "News & Updates",
    description: "Latest UGC guidelines, PhD regulations, journal updates, and important notices for scholars.",
    href: "/news",
    keywords: ["news", "ugc", "guidelines", "regulations", "updates"],
    content: `Stay updated with the latest UGC guidelines, academic regulations, and important news relevant to PhD scholars and researchers across India.`,
  },
  {
    title: "Blog & Resources",
    description: "Expert academic writing tips, research guides, thesis advice, and publication strategies.",
    href: "/blog",
    keywords: ["blog", "tips", "guides", "research", "academic"],
    content: `Expert insights, research tips, and academic writing guides from our team of PhD scholars. Stay updated with the latest in academic writing.`,
  },
  {
    title: "PhD Admissions Guidance",
    description: "Complete support for PhD admission process, university selection, SOP, and interview preparation.",
    href: "/admissions",
    keywords: ["admissions", "phd admission", "university selection", "sop"],
    content: `Navigate the complex PhD admission process with confidence. From university selection to final enrollment, we provide comprehensive guidance at every step.`,
  },
  {
    title: "PhD Thesis Writing",
    description: "End-to-end PhD thesis writing from topic selection to final submission with expert PhD writers.",
    href: "/thesis-writing",
    keywords: ["thesis", "writing", "phd thesis", "chapter"],
    content: `Expert PhD Thesis Writing Support Services. Get comprehensive thesis writing support from topic selection to final submission. Our team of PhD experts ensures your thesis meets the highest academic standards.`,
  },
  {
    title: "Synopsis Writing Services",
    description: "Professional PhD synopsis / research proposal writing with 98% university approval rate.",
    href: "/synopsis-writing",
    keywords: ["synopsis", "proposal", "research proposal"],
    content: `Professional PhD Synopsis Writing Services. A well-crafted synopsis is the foundation of your PhD journey. Our expert team helps you create a compelling research proposal that gets approved quickly.`,
  },
  {
    title: "Research Paper Writing & Publication",
    description: "Professional research paper writing for Scopus, SCI, UGC journals with publication support.",
    href: "/research-writing",
    keywords: ["research paper", "publication", "scopus", "sci"],
    content: `Get Your Research Published in Top Journals. Professional research paper writing and publication support for Scopus, SCI, and UGC-approved journals.`,
  },
  {
    title: "Frequently Asked Questions",
    description: "Answers to all common questions about thesis, research paper, pricing, and support.",
    href: "/faqs",
    keywords: ["faq", "questions", "help", "support"],
    content: `Frequently Asked Questions. Find answers to common questions about our academic research writing services.`,
  },
  {
    title: "Pricing Plans",
    description: "Flexible and transparent pricing for Standard and Premium academic writing packages.",
    href: "/pricing",
    keywords: ["pricing", "plans", "packages", "cost"],
    content: `Flexible Pricing Plans. Choose a plan that matches your academic goals and budget. Standard and Premium packages available.`,
  },
  {
    title: "Samples & Portfolio",
    description: "View real PhD thesis, synopsis, research paper, and literature review samples.",
    href: "/samples",
    keywords: ["samples", "portfolio", "examples", "thesis samples"],
    content: `Work Samples. Explore our portfolio of academic writing samples. View the quality and standards we maintain in thesis, synopsis, research papers, and more.`,
  },
  {
    title: "Contact Us",
    description: "Get in touch with our academic experts for free consultation and support.",
    href: "/contact",
    keywords: ["contact", "support", "consultation", "help"],
    content: `Contact Us. Have a question or ready to start your project? Get in touch with our team. We're here to help you succeed in your academic journey.`,
  },

  // ==================== GLOBAL & UNIVERSITY PAGES ====================
  {
    title: "Global Presence",
    description: "Academic writing support for scholars in UK, USA, UAE, Australia, Canada, and 50+ countries.",
    href: "/global",
    keywords: ["global", "international", "uk", "usa", "uae"],
    content: `Academic Support Across the Globe. CogniCodeWrite brings trusted academic support to scholars worldwide.`,
  },
  {
    title: "UK Academic Support",
    description: "PhD thesis, dissertation, and assignment help tailored for UK universities (Oxford, Cambridge, etc.).",
    href: "/global/uk",
    keywords: ["uk", "british", "oxford", "cambridge", "united kingdom", "london", "manchester", "edinburgh", "birmingham"],
    content: `Academic Writing Support for UK Scholars. Expert academic support tailored for UK universities.`,
  },
  {
    title: "US Academic Support",
    description: "Dissertation and research paper help for US universities (Harvard, Stanford, MIT, etc.).",
    href: "/global/us",
    keywords: ["usa", "american", "harvard", "stanford"],
    content: `Academic Writing Support for US Scholars. Expert academic support designed for American universities.`,
  },
  {
    title: "UAE Academic Support",
    description: "PhD research and MBA dissertation support for UAE universities (UAEU, Khalifa, etc.).",
    href: "/global/uae",
    keywords: ["uae", "dubai", "abu dhabi", "khalifa university"],
    content: `Academic Writing Support for UAE Scholars. Expert academic support tailored for UAE universities.`,
  },
  {
    title: "University-Specific Support",
    description: "Customized PhD support for Amity, Delhi University, SRM, Manav Rachna, GLA, and 100+ universities.",
    href: "/university-support",
    keywords: ["university", "amity", "delhi university", "srm"],
    content: `University Scholars Support. Specialized PhD research support tailored for scholars from specific universities.`,
  },
];