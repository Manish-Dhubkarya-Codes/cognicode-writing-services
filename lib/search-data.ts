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
  {
  title: "Article Writing Services",
  description: "Professional academic article writing for peer-reviewed journals, magazines, and academic platforms with publication support.",
  href: "/services/article-writing",
  keywords: ["article writing", "journal article", "research article", "review article", "peer reviewed", "scopus", "publication", "academic article"],
  content: `Our Article Writing Services provide high-quality academic articles crafted by subject-matter experts for peer-reviewed journals, industry magazines, and academic platforms worldwide. Journal Article Writing, Review Articles, Abstract & Keywords optimization, Proper Formatting (APA, MLA, Chicago, Harvard, IEEE), Journal Targeting & Selection, Revision & Reviewer Response Support. Publication-ready quality with 85% acceptance rate and 5000+ articles published.`,
},
{
  title: "PhD Thesis Topic Selection Services",
  description: "Expert PhD topic selection and research gap identification with guaranteed university approval.",
  href: "/services/topic-selection",
  keywords: ["topic selection", "phd topic", "research topic", "thesis topic", "research gap", "phd proposal"],
  content: `Professional PhD Thesis Topic Selection Services. We help you choose a unique, research-worthy, and feasible topic aligned with your domain and university guidelines. Includes research gap analysis, problem statement formulation, objectives refinement, and preliminary literature review. Part of our comprehensive Services offering.`,
},
{
  title: "PhD Consultation Services",
  description: "One-on-one expert PhD consultation with PhD holders for methodology, data analysis, thesis guidance, and viva preparation.",
  href: "/services/phd-consultation",
  keywords: ["phd consultation", "phd guidance", "thesis consultation", "research consultation", "viva preparation", "methodology help"],
  content: `Expert PhD Consultation Services. Personalized one-on-one sessions with experienced PhD holders covering Research Methodology, Data Analysis Support, Thesis Writing Guidance, Viva Preparation, Milestone Planning, and Research Design. 500+ PhD experts, 8000+ sessions completed, 4.9/5 scholar rating. Flexible scheduling and actionable guidance at every stage of your doctoral journey.`,
},
{
  title: "Coding & Implementation Services",
  description: "Professional research coding and software implementation support using Python, R, MATLAB, Java, and more.",
  href: "/services/coding-implementation",
  keywords: ["coding", "implementation", "python", "r", "matlab", "data analysis code", "algorithm development", "research coding"],
  content: `Research Coding & Implementation Services. Expert developers translate your research requirements into clean, well-documented, and reproducible code. Algorithm Development, Statistical Analysis, Data Processing, Simulation & Modeling, Web & App Prototypes. Support for 15+ programming languages with full walkthrough and knowledge transfer. 3000+ projects delivered.`,
},
{
  title: "Research Proposal Writing Services",
  description: "Professional research proposal and synopsis writing with 96% university approval rate.",
  href: "/services/research-proposal",
  keywords: ["research proposal", "synopsis", "phd proposal", "proposal writing", "research plan", "grant proposal"],
  content: `Professional Research Proposal Writing Services. We craft compelling, approval-ready research proposals and synopses. Problem Statement, Objectives & Questions, Literature Review, Methodology Design, Timeline & Work Plan, Budget & Outcomes. 96% approval rate and 7000+ proposals written. Perfect for PhD admissions, university approval, and funding applications.`,
},
{
  title: "Research Consultation Services",
  description: "Strategic expert research consultation for research design, methodology, analysis, and publication planning.",
  href: "/services/research-consultation",
  keywords: ["research consultation", "research guidance", "research design", "methodology consultation", "publication strategy"],
  content: `Expert Research Consultation Services. Strategic guidance on Research Design, Methodology Selection, Data Analysis Advice, Literature Strategy, Publication Planning, and Ethics & Compliance. 200+ research domains covered and 6000+ scholars guided. Actionable roadmaps that accelerate your research and publication success.`,
},
{
  title: "Research Report Writing Services",
  description: "Comprehensive research report writing with data analysis, findings, visualizations, and recommendations.",
  href: "/services/research-report",
  keywords: ["research report", "report writing", "academic report", "data analysis report", "project report"],
  content: `Professional Research Report Writing Services. We deliver clear, well-structured research reports with Executive Summary, Data Analysis, Visual Aids (charts, graphs, tables), Findings & Discussion, Recommendations, and Appendices. Academic and corporate formats supported. 4000+ reports delivered with 100% data accuracy.`,
},
{
  title: "Conference Paper Writing Services",
  description: "High-quality conference papers for IEEE, ACM, Springer, and international academic conferences.",
  href: "/services/conference-paper",
  keywords: ["conference paper", "conference writing", "ieee paper", "acm paper", "paper submission", "conference presentation"],
  content: `Conference Paper Writing Services. Expert papers tailored to specific conference themes with strict template compliance (IEEE, ACM, Springer, Elsevier). Includes Presentation Support, Visual Aids, and Camera-Ready preparation. 3000+ papers accepted with 90% acceptance rate and express delivery options.`,
},
{
  title: "Proofreading & Editing Services",
  description: "Professional academic proofreading and editing services with track changes and publication-ready polish.",
  href: "/services/proofreading-editing",
  keywords: ["proofreading", "editing", "academic editing", "thesis editing", "paper editing", "grammar check"],
  content: `Professional Proofreading & Editing Services. Native English-speaking editors refine Grammar & Spelling, Sentence Structure, Academic Tone, Consistency, Citation Verification, and more. Two-tier review process with track changes. 12,000+ documents edited with 24-hour express options.`,
},
{
  title: "Scopus Paper Writing Services",
  description: "Expert Scopus-indexed journal paper writing with journal selection and high acceptance support.",
  href: "/services/scopus-paper",
  keywords: ["scopus paper", "scopus writing", "scopus publication", "journal paper", "sci paper", "high impact journal"],
  content: `Scopus-Indexed Paper Writing Services. Complete support from Journal Selection and Impact Factor Analysis to Manuscript Preparation, Data & Results, Indexing Optimization, and Peer Review Support. 2500+ Scopus papers published with 88% acceptance rate. Boost your h-index and citations.`,
},
{
  title: "Literature Review Writing Services",
  description: "Comprehensive systematic and narrative literature reviews with gap identification and synthesis.",
  href: "/services/literature-review",
  keywords: ["literature review", "systematic review", "narrative review", "thesis chapter 2", "research gap analysis"],
  content: `Expert Literature Review Writing Services. Systematic search across premium databases, Critical Analysis, Thematic Synthesis, Gap Identification, and Visual Mapping. 8000+ literature reviews completed with 200+ sources per review. Follows PRISMA guidelines and delivers publication-ready quality.`,
},
{
  title: "Review Paper Writing Services",
  description: "High-impact systematic review, survey, and meta-analysis papers for top journals.",
  href: "/services/review-paper",
  keywords: ["review paper", "systematic review", "survey paper", "meta analysis", "literature survey"],
  content: `Expert Review Paper Writing Services. Comprehensive surveys that identify trends, compare methodologies, and provide future research directions. High citation potential with taxonomy, classification tables, and journal-ready formatting. Suitable for Q1/Q2 journals.`,
},
{
  title: "LaTeX Editor & Thesis Formatting Services",
  description: "Professional LaTeX editing, real-time compilation, and academic document formatting with live PDF preview.",
  href: "/services/latex-editor",
  keywords: ["latex", "latex editor", "thesis formatting", "latex thesis", "overleaf", "academic latex"],
  content: `LaTeX Editor & Professional Formatting Services. Real-time LaTeX to PDF converter with live preview, CodeMirror editor, undo/redo, dark/light theme, and instant compilation. Perfect for PhD theses, research papers, and complex academic documents. Includes expert LaTeX help and template customization.`,
},
{
  title: "Book Writing & Publishing Services",
  description: "End-to-end academic book writing and publishing support from manuscript to print and distribution.",
  href: "/services/publishing",
  keywords: ["book writing", "academic book", "book publishing", "monograph", "textbook publishing", "isbn"],
  content: `Academic Book Writing & Publishing Services. Complete support including Book Proposal & Outline, Chapter Writing, Publisher Outreach, ISBN & Copyright, Cover Design & Typesetting, and Print & E-Book Setup. 500+ books published with connections to 50+ academic publishers.`,
},

  // ==================== MAIN PAGES ====================
  {
    title: "About CogniCode",
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
    content: `Discover why thousands of PhD scholars choose CogniCode. 15+ Years of Experience, 12,000+ Projects Completed, 100% Original Content, 24/7 Dedicated Support, High Success Rate.`,
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
    content: `Academic Support Across the Globe. CogniCode brings trusted academic support to scholars worldwide.`,
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