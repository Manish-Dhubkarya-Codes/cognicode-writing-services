export type BlogCategorySlug =
  | "thesis-writing"
  | "literature-review"
  | "data-analysis"
  | "academic-publishing"
  | "research-integrity"
  | "ai-ml"
  | "scholar-success";

export type BlogCategory = {
  name: string;
  slug: BlogCategorySlug;
  description: string;
  serviceHref: string;
  serviceLabel: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type BlogPostTypeSlug =
  | "article"
  | "tutorial"
  | "how-to"
  | "listicle"
  | "news"
  | "comparison"
  | "video"
  | "resource"
  | "faq"
  | "case-study";

export type BlogBlockType =
  | "section"
  | "heading"
  | "paragraphs"
  | "list"
  | "callout"
  | "image"
  | "video"
  | "youtube"
  | "code"
  | "table"
  | "quote"
  | "download"
  | "faq"
  | "links";

export type BlogSection = {
  id: string;
  type?: BlogBlockType;
  heading?: string;
  level?: 2 | 3;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: boolean;
  callout?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  code?: string;
  language?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  quote?: string;
  cite?: string;
  download?: {
    title: string;
    description?: string;
    url: string;
    fileLabel?: string;
    fileType?: string;
  };
  faqs?: { question: string; answer: string }[];
  links?: {
    title: string;
    url: string;
    description?: string;
  }[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  metaDescription: string;
  category: BlogCategorySlug;
  postType?: BlogPostTypeSlug;
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced" | "";
  author: BlogAuthor;
  date: string;
  dateISO: string;
  updatedISO?: string;
  readTime: string;
  featured?: boolean;
  imageGradient: string;
  imageLabel: string;
  keywords: string[];
  keyTakeaways: string[];
  attachments?: {
    title: string;
    description?: string;
    url: string;
    fileLabel?: string;
    fileType?: string;
  }[];
  sections: BlogSection[];
  resource?: {
    title: string;
    description: string;
    fileLabel: string;
  };
  serviceCta: {
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
  };
};

export type FreeResource = {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Excel" | "Checklist";
  category: BlogCategorySlug;
  href: string;
};

export const blogCategories: BlogCategory[] = [
  {
    name: "Thesis Writing",
    slug: "thesis-writing",
    description:
      "Step-by-step chapter guidance, structure frameworks, and practical fixes for common thesis pitfalls.",
    serviceHref: "/services/phd-thesis-writing",
    serviceLabel: "Thesis Writing Support",
  },
  {
    name: "Literature Review",
    slug: "literature-review",
    description:
      "Search strategies, critical analysis, research gap identification, and methodology design.",
    serviceHref: "/services/literature-review",
    serviceLabel: "Literature Review Service",
  },
  {
    name: "Data Analysis",
    slug: "data-analysis",
    description:
      "SPSS, R, and Python workflows with clear interpretation for thesis and journal results.",
    serviceHref: "/services/statistical-analysis-data-analytics",
    serviceLabel: "Data Analysis Support",
  },
  {
    name: "Academic Publishing",
    slug: "academic-publishing",
    description:
      "Journal selection, conference papers, peer review responses, and indexing guidance.",
    serviceHref: "/services/publishing",
    serviceLabel: "Publishing Support",
  },
  {
    name: "Research Integrity",
    slug: "research-integrity",
    description:
      "Plagiarism ethics, citation styles, originality assurance, and responsible research practice.",
    serviceHref: "/services/plagiarism-removal",
    serviceLabel: "Originality & Plagiarism Support",
  },
  {
    name: "AI/ML",
    slug: "ai-ml",
    description:
      "Practical AI and machine learning methods for modern academic research workflows.",
    serviceHref: "/services/ai-ml",
    serviceLabel: "AI/ML Research Support",
  },
  {
    name: "Scholar Success",
    slug: "scholar-success",
    description:
      "Motivation, time management, viva preparation, funding, and post-PhD career clarity.",
    serviceHref: "/contact",
    serviceLabel: "Talk to a Research Mentor",
  },
];

export const authors: Record<string, BlogAuthor> = {
  richard: {
    name: "Dr. Richard Anderson",
    role: "Founder & Senior Academic Advisor",
    bio: "PhD in Education with 20+ years of academic writing experience. Helps scholars convert complex research into examiner-ready theses and high-impact publications.",
    initials: "RA",
  },
  maria: {
    name: "Dr. Maria Santos",
    role: "Head of Research Methodology",
    bio: "PhD in Psychology specializing in qualitative and mixed-methods design. Mentors scholars on literature synthesis, research gaps, and rigorous methodology chapters.",
    initials: "MS",
  },
  james: {
    name: "Dr. James Williams",
    role: "Senior Academic Editor",
    bio: "PhD in Literature with extensive editorial experience across journals and conference proceedings. Focuses on clarity, structure, and scholarly voice.",
    initials: "JW",
  },
  lisa: {
    name: "Dr. Lisa Chen",
    role: "Data Analysis Lead",
    bio: "PhD in Statistics with expertise in SPSS, R, Python, and advanced modelling. Translates statistical output into examiner-friendly interpretation.",
    initials: "LC",
  },
};

const baseSections = (
  intro: string[],
  steps: { heading: string; paragraphs: string[]; bullets?: string[] }[],
  mistakes: string[],
  close: string[]
): BlogSection[] => [
  {
    id: "introduction",
    heading: "Introduction",
    level: 2,
    paragraphs: intro,
  },
  ...steps.map((step, index) => ({
    id: `section-${index + 1}`,
    heading: step.heading,
    level: 2 as const,
    paragraphs: step.paragraphs,
    bullets: step.bullets,
  })),
  {
    id: "common-mistakes",
    heading: "Common Mistakes to Avoid",
    level: 2,
    paragraphs: [
      "Most scholars lose marks not because of weak ideas, but because of avoidable execution gaps. Watch for these patterns before submission.",
    ],
    bullets: mistakes,
  },
  {
    id: "conclusion",
    heading: "Conclusion",
    level: 2,
    paragraphs: close,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-write-literature-review-research-gaps",
    title: "How to Write a Literature Review That Actually Identifies Research Gaps",
    excerpt:
      "Move beyond summary. Learn a practical framework to search, critique, synthesise, and articulate research gaps examiners respect.",
    metaDescription:
      "Learn how to write a literature review that identifies real research gaps. Includes search strategy, literature matrix, critical analysis framework, and free template.",
    category: "literature-review",
    author: authors.maria,
    date: "August 5, 2026",
    dateISO: "2026-08-05",
    readTime: "12 min read",
    featured: true,
    imageGradient: "from-violet-900 via-purple-800 to-fuchsia-700",
    imageLabel: "Literature Review",
    keywords: [
      "how to write literature review",
      "research gap identification",
      "literature review structure",
    ],
    keyTakeaways: [
      "A strong literature review critiques and synthesises; it does not merely summarise papers.",
      "A literature matrix turns scattered notes into gap-ready evidence.",
      "Clear inclusion/exclusion criteria protect your scope and examiner confidence.",
      "Gap statements should show what is known, what is missing, and why it matters now.",
      "Structure by theme or method when that best reveals contribution opportunities.",
    ],
    sections: [
      {
        id: "hook",
        heading: "Why most literature reviews fail to impress examiners",
        level: 2,
        paragraphs: [
          "Many PhD scholars treat the literature review as a catalogue of papers. They list what Author A found, what Author B claimed, and what Author C recommended. Examiners finish reading and still cannot answer a simple question: what is missing, and why does this study need to exist?",
          "A high-quality literature review is argumentative. It organises prior work around debates, methods, populations, and outcomes - then shows where evidence is weak, contradictory, outdated, or absent. That is how research gaps become credible rather than decorative.",
        ],
      },
      {
        id: "what-strong-lr-achieves",
        heading: "What a strong literature review must achieve",
        level: 2,
        paragraphs: [
          "Beyond summary, your review should establish intellectual ownership of the field. That means demonstrating command of seminal work, current debates, methodological traditions, and practical constraints in your context.",
        ],
        bullets: [
          "Map the intellectual landscape of your topic with clear themes",
          "Evaluate quality, not only quantity, of existing evidence",
          "Synthesise findings across studies rather than stacking abstracts",
          "Identify contradictions, blind spots, and under-researched contexts",
          "Justify your research questions and methodological choices",
        ],
      },
      {
        id: "step-1",
        heading: "Step 1 - Define scope and search strategy",
        level: 2,
        paragraphs: [
          "Start with a focused research question and translate it into searchable concepts. Decide databases early (Scopus, Web of Science, Google Scholar, PubMed, IEEE Xplore, or discipline-specific indexes) and document Boolean strings so your process is reproducible.",
          "Write inclusion and exclusion criteria before deep reading. Criteria may cover years, language, study design, population, geography, and publication type. This protects you from scope creep and strengthens methodological transparency.",
        ],
        bullets: [
          "Define primary and secondary keywords plus synonyms",
          "Record Boolean combinations and filters used",
          "Track screening decisions in a simple log or PRISMA-style flow",
          "Prioritise peer-reviewed sources while noting grey literature carefully",
        ],
      },
      {
        id: "step-2",
        heading: "Step 2 - Build your literature matrix",
        level: 2,
        paragraphs: [
          "A literature matrix is the most practical tool for turning notes into insight. Create columns for citation, aim, method, sample, key findings, limitations, and relevance to your study. Once filled, patterns become visible: repeated methods, ignored populations, conflicting results, and weak theoretical framing.",
          "This is also the stage where downloadable templates save weeks of messy note-taking. Capture enough detail that you can write without reopening every PDF repeatedly.",
        ],
        callout:
          "Download free: Literature Review Matrix Template (Excel + PDF) - use it to compare studies side by side and surface gaps faster.",
      },
      {
        id: "step-3",
        heading: "Step 3 - Use a critical analysis framework",
        level: 2,
        paragraphs: [
          "Critical analysis is not hostility toward authors. It is disciplined evaluation. For each cluster of studies, ask what claims are strongly supported, what assumptions are untested, and what alternative explanations remain plausible.",
        ],
        bullets: [
          "Compare: How do findings align or diverge across contexts?",
          "Contrast: Where do methods or samples explain different results?",
          "Synthesise: What collective story emerges from the body of work?",
          "Critique: What quality issues limit confidence in conclusions?",
        ],
      },
      {
        id: "step-4",
        heading: "Step 4 - Identify and articulate the research gap",
        level: 2,
        paragraphs: [
          "A research gap is not “no one studied my exact title.” Strong gap statements show a meaningful absence: underexplored population, outdated theory, method bias, conflicting evidence, or practical problem ignored by prior designs.",
          "A reliable formula: (1) establish what is known, (2) show the boundary of that knowledge, (3) explain why the missing piece matters for theory, practice, or policy, and (4) position your study as a focused response.",
        ],
      },
      {
        id: "step-5",
        heading: "Step 5 - Structure the chapter for clarity",
        level: 2,
        paragraphs: [
          "Choose a structure that best reveals your argument. Thematic organisation is usually strongest for gap-led reviews. Chronological works when the field evolved through distinct eras. Methodological organisation helps when your contribution is design-driven.",
          "Open with scope and search approach, develop theme sections with synthesis paragraphs, then close with a gap summary that bridges directly into your research questions and methodology.",
        ],
      },
      {
        id: "common-mistakes",
        heading: "Common mistakes that weaken literature reviews",
        level: 2,
        paragraphs: [
          "Avoid these patterns before supervisor review or viva preparation.",
        ],
        bullets: [
          "Annotated bibliography style with no synthesis between studies",
          "Over-reliance on outdated sources without justifying historical inclusion",
          "Ignoring contradictory findings that challenge your preferred narrative",
          "Gap claims that are too broad to be researched in one project",
          "Missing link between reviewed literature and chosen methodology",
        ],
      },
      {
        id: "tools",
        heading: "Tools that speed up the process",
        level: 2,
        paragraphs: [
          "Use reference managers early (Zotero, Mendeley, EndNote). Connected Papers, ResearchRabbit, and citation chaining help expand relevant networks. Elicit and similar AI tools can assist screening, but keep human critical judgement at the centre and follow your university’s AI policy.",
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        level: 2,
        paragraphs: [
          "A literature review earns respect when it proves you understand the conversation and can extend it. Build a disciplined search strategy, maintain a living matrix, analyse critically, and write gap statements that are specific, evidence-based, and researchable.",
          "If you apply the steps in this guide, your review will do more than satisfy a chapter requirement - it will justify your entire study.",
        ],
      },
    ],
    resource: {
      title: "Literature Review Matrix Template",
      description:
        "Excel + PDF template to compare aims, methods, findings, limitations, and gap signals across studies.",
      fileLabel: "Download free template",
    },
    serviceCta: {
      title: "Need a critical literature review reviewed by PhD experts?",
      description:
        "Our team helps scholars strengthen synthesis, gap articulation, and chapter structure without compromising academic integrity.",
      href: "/services/literature-review",
      buttonLabel: "Explore Literature Review Support",
    },
  },
  {
    id: "2",
    slug: "how-to-structure-phd-thesis-2026",
    title: "How to Structure a PhD Thesis in 2026: Complete Chapter-by-Chapter Guide",
    excerpt:
      "A modern, examiner-friendly thesis structure with chapter purpose, common pitfalls, and a practical outline you can adapt by discipline.",
    metaDescription:
      "Complete 2026 guide to structuring a PhD thesis chapter by chapter, with practical outlines and examiner expectations.",
    category: "thesis-writing",
    author: authors.richard,
    date: "July 28, 2026",
    dateISO: "2026-07-28",
    readTime: "14 min read",
    imageGradient: "from-slate-900 via-indigo-900 to-blue-800",
    imageLabel: "Thesis Structure",
    keywords: ["how to structure a PhD thesis", "thesis chapter guide"],
    keyTakeaways: [
      "Every chapter should answer a clear scholarly question for the examiner.",
      "Structure serves argument - do not force content into a rigid template blindly.",
      "Introduction and conclusion should mirror each other in claims and contribution.",
      "Methodology must justify choices, not only describe software or tools.",
      "A realistic writing sequence prevents last-minute chapter collapse.",
    ],
    sections: baseSections(
      [
        "A well-structured thesis helps examiners follow your contribution without friction. In 2026, successful theses still rely on classic scholarly logic, but they communicate purpose earlier, integrate ethics and reproducibility more explicitly, and keep chapters tightly linked to research questions.",
        "This guide walks through a practical chapter model you can adapt for STEM, social sciences, management, and interdisciplinary projects.",
      ],
      [
        {
          heading: "Chapter map at a glance",
          paragraphs: [
            "Most doctoral theses move from problem framing to evidence and contribution. Your university handbook remains authoritative, but the logic below is widely accepted across institutions.",
          ],
          bullets: [
            "Introduction: problem, questions, contribution, roadmap",
            "Literature review: debate map and research gap",
            "Methodology: design, data, analysis, ethics, limitations",
            "Results / Findings: evidence organised by questions or themes",
            "Discussion: meaning, contribution, implications",
            "Conclusion: synthesis, limitations, future work",
          ],
        },
        {
          heading: "Write for examiner navigation",
          paragraphs: [
            "Use explicit signposting at chapter openings and closings. Tell the reader what the chapter does, how it connects to previous claims, and what decision it prepares for next. Clear navigation is not simplistic - it is professional academic communication.",
          ],
        },
        {
          heading: "Adapt structure without losing coherence",
          paragraphs: [
            "Some projects combine results and discussion; others split findings into multiple empirical chapters. That is fine when each chapter has a distinct analytical purpose. Coherence comes from recurring research questions, not identical headings across all disciplines.",
          ],
        },
      ],
      [
        "Chapters that repeat the literature review instead of advancing argument",
        "Methodology written as software tutorial rather than design justification",
        "Results without linkage back to research questions",
        "Conclusion that introduces brand-new claims never evidenced earlier",
      ],
      [
        "Structure is a scholarly instrument. When each chapter has a job and every section advances your central claim, examiners experience clarity - and your contribution becomes easier to defend in viva.",
      ]
    ),
    resource: {
      title: "Thesis Outline Template",
      description: "Chapter-by-chapter outline with purpose prompts and completion checklist.",
      fileLabel: "Download outline PDF",
    },
    serviceCta: {
      title: "Need expert support shaping your thesis structure?",
      description:
        "Work with PhD mentors who help refine chapter logic, academic tone, and submission readiness.",
      href: "/services/phd-thesis-writing",
      buttonLabel: "View Thesis Writing Support",
    },
  },
  {
    id: "3",
    slug: "common-thesis-writing-mistakes",
    title: "12 Most Common Thesis Writing Mistakes (and How to Fix Them Before Submission)",
    excerpt:
      "From weak research questions to inconsistent formatting - practical fixes for the issues that delay approvals and frustrate examiners.",
    metaDescription:
      "Avoid the 12 most common thesis writing mistakes with practical fixes before submission and viva.",
    category: "thesis-writing",
    author: authors.james,
    date: "July 18, 2026",
    dateISO: "2026-07-18",
    readTime: "10 min read",
    imageGradient: "from-rose-900 via-red-800 to-orange-700",
    imageLabel: "Thesis Mistakes",
    keywords: ["thesis writing mistakes", "thesis submission checklist"],
    keyTakeaways: [
      "Most delays come from structural and clarity issues, not lack of intelligence.",
      "Research questions must drive every major section.",
      "Evidence, claim, and citation discipline matter as much as word count.",
      "Leave time for consistency checks across terminology and formatting.",
    ],
    sections: baseSections(
      [
        "After reviewing thousands of academic drafts, certain mistakes appear repeatedly. The good news: almost all are fixable with a disciplined revision pass before supervisor submission.",
      ],
      [
        {
          heading: "High-impact mistakes and fixes",
          paragraphs: [
            "Treat this as a pre-submission audit. Work section by section and mark each issue as resolved only when evidence appears in the manuscript.",
          ],
          bullets: [
            "Vague research questions → rewrite with population, phenomenon, and outcome",
            "Literature dump → reorganise by themes and debates",
            "Method-method mismatch → align design with questions",
            "Over-claiming in discussion → calibrate language to evidence strength",
            "Inconsistent terms → create a terminology glossary and apply it",
          ],
        },
        {
          heading: "Final technical polish",
          paragraphs: [
            "Formatting, captions, cross-references, and reference list accuracy signal professionalism. Examiners notice when tables, figures, and citations are carefully controlled.",
          ],
        },
      ],
      [
        "Submitting without a reverse outline of each chapter",
        "Ignoring supervisor comments on conceptual clarity",
        "Leaving plagiarism and paraphrasing checks until the final day",
      ],
      [
        "A clean thesis is rarely written in one heroic week. Use this mistake list as a recurring checklist during drafting and you will enter submission with fewer avoidable risks.",
      ]
    ),
    resource: {
      title: "Thesis Pre-Submission Checklist",
      description: "Printable checklist covering structure, claims, citations, and formatting.",
      fileLabel: "Download checklist",
    },
    serviceCta: {
      title: "Want a professional academic review before submission?",
      description:
        "Get targeted feedback on clarity, structure, and scholarly presentation from subject-aware editors.",
      href: "/services/proofreading-editing",
      buttonLabel: "Explore Editing Support",
    },
  },
  {
    id: "4",
    slug: "spss-for-thesis-beginner-to-advanced",
    title: "SPSS for Thesis: Complete Beginner-to-Advanced Guide with Interpretation Examples",
    excerpt:
      "A practical SPSS workflow for thesis scholars - from data setup and assumptions to reporting results examiners can trust.",
    metaDescription:
      "SPSS for thesis guide covering data setup, tests, assumption checks, and interpretation examples for academic reporting.",
    category: "data-analysis",
    author: authors.lisa,
    date: "July 10, 2026",
    dateISO: "2026-07-10",
    readTime: "15 min read",
    imageGradient: "from-cyan-900 via-teal-800 to-emerald-700",
    imageLabel: "SPSS Analysis",
    keywords: ["SPSS for thesis", "interpret SPSS results"],
    keyTakeaways: [
      "Clean data and codebooks prevent most analysis disasters.",
      "Assumption checks are part of rigorous reporting, not optional extras.",
      "Interpretation must answer research questions in plain academic language.",
      "Tables and narrative text should tell the same statistical story.",
    ],
    sections: baseSections(
      [
        "SPSS remains one of the most used tools in social sciences, management, education, and health research. Yet many scholars generate output they cannot confidently explain. This guide focuses on defensible workflow and interpretation, not button-clicking alone.",
      ],
      [
        {
          heading: "Set up data the examiner-friendly way",
          paragraphs: [
            "Define variable names, labels, value labels, and missing-value rules before running tests. A transparent codebook makes your methodology reproducible and protects you during viva questions about coding decisions.",
          ],
        },
        {
          heading: "Choose tests from design, not habit",
          paragraphs: [
            "Match statistical tests to research questions, variable types, and design (between-groups, repeated measures, predictive models). Always document why a test is appropriate and what assumptions you checked.",
          ],
        },
        {
          heading: "Report with interpretation, not only p-values",
          paragraphs: [
            "State the test, key statistics, effect sizes where relevant, and practical meaning. Avoid the trap of equating statistical significance with theoretical importance.",
          ],
        },
      ],
      [
        "Running every available test without a pre-registered analysis plan",
        "Ignoring assumption violations or failing to report remedies",
        "Copy-pasting SPSS tables without narrative synthesis",
      ],
      [
        "SPSS becomes powerful when paired with methodological judgement. Clean data, justified tests, and clear interpretation turn output into a results chapter examiners can follow.",
      ]
    ),
    resource: {
      title: "Data Analysis Reporting Checklist",
      description: "Checklist for assumptions, statistics, tables, and interpretation language.",
      fileLabel: "Download checklist",
    },
    serviceCta: {
      title: "Need help analysing or interpreting your dataset?",
      description:
        "Our analysts support SPSS, R, and Python workflows with thesis-ready interpretation support.",
      href: "/services/statistical-analysis-data-analytics",
      buttonLabel: "Explore Data Analysis Support",
    },
  },
  {
    id: "5",
    slug: "how-to-select-journal-for-publication-2026",
    title: "How to Select the Right Journal for Your Research Paper (2026 Checklist)",
    excerpt:
      "Use a practical scorecard for scope fit, indexing, audience, timelines, and predatory-journal red flags before you submit.",
    metaDescription:
      "2026 journal selection checklist covering scope fit, indexing, quality signals, and predatory journal red flags.",
    category: "academic-publishing",
    author: authors.james,
    date: "June 30, 2026",
    dateISO: "2026-06-30",
    readTime: "9 min read",
    imageGradient: "from-amber-900 via-yellow-800 to-lime-700",
    imageLabel: "Journal Selection",
    keywords: ["how to select journal for publication", "journal selection checklist"],
    keyTakeaways: [
      "Scope fit beats prestige when the goal is acceptance and readership.",
      "Verify indexing claims directly from trusted sources.",
      "Read recent articles to test methodological and stylistic fit.",
      "A simple scorecard reduces emotional or prestige-only decisions.",
    ],
    sections: baseSections(
      [
        "Journal choice is a strategic research decision. The right venue increases the odds of fair peer review and relevant readership. The wrong venue wastes months and can expose scholars to predatory practices.",
      ],
      [
        {
          heading: "Build a shortlist with evidence",
          paragraphs: [
            "Start from papers you cite, association journals in your field, and indexing databases. Shortlist 5–8 journals and evaluate them with the same criteria rather than reputation alone.",
          ],
          bullets: [
            "Aims and scope alignment",
            "Article types accepted",
            "Indexing and transparency of metrics",
            "Average review timeline and open-access policy",
            "Editorial board credibility",
          ],
        },
        {
          heading: "Watch for quality and integrity signals",
          paragraphs: [
            "Be cautious with aggressive solicitation emails, unclear peer-review processes, and fees that appear before any editorial assessment. Cross-check journal claims rather than relying on website marketing language.",
          ],
        },
      ],
      [
        "Submitting simultaneously to multiple journals",
        "Ignoring author guidelines on structure and word limits",
        "Choosing only by impact factor without scope fit",
      ],
      [
        "A disciplined selection process protects your time and reputation. Use a scorecard, verify claims, and submit where your contribution is most relevant.",
      ]
    ),
    resource: {
      title: "Journal Selection Scorecard",
      description: "Weighted scorecard for comparing journals before submission.",
      fileLabel: "Download scorecard",
    },
    serviceCta: {
      title: "Need support preparing a journal-ready manuscript?",
      description:
        "From structuring to journal targeting, our publication mentors help scholars submit with confidence.",
      href: "/services/publishing",
      buttonLabel: "Explore Publishing Support",
    },
  },
  {
    id: "6",
    slug: "plagiarism-academic-writing-originality-guide",
    title: "Plagiarism in Academic Writing: What Counts, How Detection Works, and How to Stay Original",
    excerpt:
      "Understand similarity reports, patchwriting risks, citation discipline, and ethical rewriting practices that protect scholarly integrity.",
    metaDescription:
      "Guide to plagiarism in academic writing: what counts, how detection tools work, and how to maintain originality ethically.",
    category: "research-integrity",
    author: authors.richard,
    date: "June 20, 2026",
    dateISO: "2026-06-20",
    readTime: "11 min read",
    imageGradient: "from-stone-900 via-neutral-800 to-zinc-700",
    imageLabel: "Research Integrity",
    keywords: ["plagiarism in thesis", "academic originality"],
    keyTakeaways: [
      "Similarity percentage is a signal, not an automatic verdict.",
      "Patchwriting is still a risk even when synonyms are changed.",
      "Good note-taking habits prevent accidental plagiarism.",
      "Ethical paraphrasing preserves meaning and cites the source.",
    ],
    sections: baseSections(
      [
        "Originality is foundational to academic trust. Scholars sometimes fear plagiarism tools without understanding what those tools measure. This guide clarifies common categories of plagiarism and practical habits that keep writing both ethical and strong.",
      ],
      [
        {
          heading: "What usually counts as plagiarism",
          paragraphs: [
            "Direct copying, unattributed paraphrase, mosaic patchwriting, and reusing your own prior work without disclosure can all create integrity issues depending on institutional policy. Always check your university handbook.",
          ],
        },
        {
          heading: "How detection systems are commonly used",
          paragraphs: [
            "Similarity reports highlight overlapping text. Human judgement still decides whether overlap is acceptable (for example, references, methods phrasing, or properly quoted material) or problematic. Learn to read reports section by section.",
          ],
        },
        {
          heading: "Build originality into the writing process",
          paragraphs: [
            "Take notes in your own words, track sources immediately, and write synthesis paragraphs from understanding rather than from open source PDFs line by line. This reduces both ethical risk and awkward prose.",
          ],
        },
      ],
      [
        "Treating a low similarity score as proof of conceptual originality",
        "Quoting excessively instead of synthesising",
        "Recycling methods text from earlier papers without clarification",
      ],
      [
        "Integrity is not only a compliance task. Scholars who write from genuine understanding produce clearer arguments - and sleep better before submission.",
      ]
    ),
    resource: {
      title: "Originality Self-Check Sheet",
      description: "Quick audit for paraphrase quality, citation completeness, and reuse risks.",
      fileLabel: "Download sheet",
    },
    serviceCta: {
      title: "Need support improving originality and academic phrasing?",
      description:
        "Our editors help scholars strengthen paraphrase quality and citation discipline while preserving meaning.",
      href: "/services/plagiarism-removal",
      buttonLabel: "Explore Integrity Support",
    },
  },
  {
    id: "7",
    slug: "ethical-use-of-ai-tools-phd-research-2026",
    title: "Ethical Use of AI Tools in PhD Research - Do’s and Don’ts for 2026",
    excerpt:
      "A practical policy-aware guide to using ChatGPT, Claude, Gemini, and similar tools without undermining academic integrity.",
    metaDescription:
      "Ethical AI use for PhD research in 2026: practical do’s, don’ts, disclosure tips, and integrity-safe workflows.",
    category: "research-integrity",
    author: authors.maria,
    date: "June 12, 2026",
    dateISO: "2026-06-12",
    readTime: "8 min read",
    imageGradient: "from-indigo-950 via-blue-900 to-sky-800",
    imageLabel: "AI Ethics",
    keywords: ["AI tools for PhD research ethics", "ChatGPT PhD integrity"],
    keyTakeaways: [
      "University AI policy comes first - always verify local rules.",
      "AI can assist brainstorming and editing, not replace scholarly judgement.",
      "Disclose AI use when required by institution or journal.",
      "Never outsource core intellectual contribution without ownership.",
    ],
    sections: baseSections(
      [
        "AI tools are now part of everyday research life. Used carefully, they can accelerate literature discovery, language polishing, and coding support. Used carelessly, they can introduce fabricated citations, shallow analysis, and integrity violations.",
      ],
      [
        {
          heading: "Safer uses",
          paragraphs: [
            "Brainstorming outlines, clarifying dense paragraphs you already understand, generating practice quiz questions, or refactoring code you can verify are generally lower-risk when policy allows.",
          ],
          bullets: [
            "Ask for explanations, then validate against trusted sources",
            "Use AI to improve clarity of your own draft text",
            "Keep a log of prompts if disclosure may be required",
          ],
        },
        {
          heading: "High-risk uses",
          paragraphs: [
            "Generating literature reviews with unverified citations, fabricating results, or submitting AI-written chapters as your unaided work creates serious academic risk. Treat model output as untrusted until checked.",
          ],
        },
      ],
      [
        "Blind trust in AI-generated references",
        "No disclosure where journals or universities require it",
        "Using AI to bypass learning core methods of your discipline",
      ],
      [
        "Ethical AI use is about ownership and transparency. Keep yourself as the accountable scholar in every important intellectual decision.",
      ]
    ),
    serviceCta: {
      title: "Building an AI-assisted research workflow the right way?",
      description:
        "We help scholars integrate modern tools into research design and writing while respecting integrity standards.",
      href: "/services/ai-ml",
      buttonLabel: "Explore AI/ML Research Support",
    },
  },
  {
    id: "8",
    slug: "machine-learning-transforming-academic-research-2026",
    title: "How Machine Learning is Transforming Academic Research in 2026",
    excerpt:
      "From literature triage to predictive modelling - practical ways ML is changing research workflows across disciplines.",
    metaDescription:
      "Explore how machine learning is transforming academic research in 2026, with practical use cases for thesis and journal work.",
    category: "ai-ml",
    author: authors.lisa,
    date: "June 2, 2026",
    dateISO: "2026-06-02",
    readTime: "10 min read",
    imageGradient: "from-blue-950 via-indigo-900 to-violet-800",
    imageLabel: "Machine Learning",
    keywords: ["machine learning in academic research", "ML for thesis"],
    keyTakeaways: [
      "ML is a method family - choose models that fit research questions.",
      "Data quality and validation matter more than model fashion.",
      "Interpretability is essential for examiner and reviewer trust.",
      "Not every project needs deep learning to be rigorous.",
    ],
    sections: baseSections(
      [
        "Machine learning is no longer limited to computer science departments. Scholars in health, education, business, engineering, and social research now use ML for classification, prediction, clustering, and large-scale text analysis.",
      ],
      [
        {
          heading: "High-value academic use cases",
          paragraphs: [
            "Common applications include screening large literature sets, predicting outcomes from structured data, detecting patterns in sensor streams, and analysing open-ended survey responses with supervised or unsupervised methods.",
          ],
        },
        {
          heading: "Methodological caution",
          paragraphs: [
            "Academic credibility depends on transparent data splits, baseline comparisons, leakage prevention, and honest reporting of limitations. Fancy architectures cannot rescue poorly defined variables or biased samples.",
          ],
        },
      ],
      [
        "Choosing complex models without a baseline",
        "Reporting only accuracy while ignoring class imbalance",
        "Failing to connect model metrics to domain contribution",
      ],
      [
        "ML can elevate research when it is methodologically grounded. Start with the question, honour data constraints, and report with the same honesty expected of traditional statistics.",
      ]
    ),
    serviceCta: {
      title: "Planning an AI/ML component for your thesis?",
      description:
        "Get support on model selection, implementation, validation, and academic reporting.",
      href: "/services/ai-ml",
      buttonLabel: "Talk to AI/ML Mentors",
    },
  },
  {
    id: "9",
    slug: "phd-viva-common-questions-how-to-answer",
    title: "Preparing for Your PhD Viva: Common Questions and How to Answer Them",
    excerpt:
      "A practical viva preparation system with common examiner questions, answer frameworks, and calm delivery strategies.",
    metaDescription:
      "Prepare for PhD viva with common questions, structured answer frameworks, and practical defence strategies.",
    category: "scholar-success",
    author: authors.richard,
    date: "May 22, 2026",
    dateISO: "2026-05-22",
    readTime: "9 min read",
    imageGradient: "from-emerald-950 via-green-900 to-teal-800",
    imageLabel: "Viva Prep",
    keywords: ["PhD viva questions", "thesis defence preparation"],
    keyTakeaways: [
      "Viva success depends on ownership of decisions, not memorised scripts.",
      "Prepare concise frameworks for contribution, methods, and limitations.",
      "Practise aloud under timed conditions.",
      "Honest limitation talk builds examiner trust.",
    ],
    sections: baseSections(
      [
        "The viva is a conversation about scholarly judgement. Examiners want to see that you understand your choices, can defend your contribution, and can situate findings in the wider field.",
      ],
      [
        {
          heading: "Core question families",
          paragraphs: [
            "Most questions cluster around motivation, literature positioning, methods, findings, contribution, limitations, and future work. Prepare one clear narrative for each cluster.",
          ],
          bullets: [
            "Why this problem, and why now?",
            "What is original in your approach or findings?",
            "Why this design rather than alternatives?",
            "What would you improve with more time or data?",
          ],
        },
        {
          heading: "Answer with structure",
          paragraphs: [
            "Use a simple pattern: claim → evidence from thesis → implication. Keep answers focused, then invite follow-up. If you do not know something, acknowledge it and reason transparently.",
          ],
        },
      ],
      [
        "Over-rehearsed monologues that ignore the actual question",
        "Defensiveness when limitations are discussed",
        "Inability to explain statistics or coding decisions you report",
      ],
      [
        "Treat viva prep as intellectual consolidation. When you can explain every major decision calmly, the defence becomes a professional discussion rather than an interrogation.",
      ]
    ),
    serviceCta: {
      title: "Want a mock viva or defence coaching session?",
      description:
        "Practise with experienced mentors who stress-test your contribution narrative and method justifications.",
      href: "/contact",
      buttonLabel: "Book a Consultation",
    },
  },
  {
    id: "10",
    slug: "systematic-vs-narrative-literature-review",
    title: "Systematic vs Narrative Literature Review: Which One Should You Choose?",
    excerpt:
      "A clear decision guide comparing systematic and narrative reviews - purpose, process, effort, and examiner expectations.",
    metaDescription:
      "Compare systematic vs narrative literature reviews and choose the right approach for your thesis or paper.",
    category: "literature-review",
    author: authors.maria,
    date: "May 12, 2026",
    dateISO: "2026-05-12",
    readTime: "8 min read",
    imageGradient: "from-purple-950 via-fuchsia-900 to-pink-800",
    imageLabel: "Review Types",
    keywords: ["systematic vs narrative review", "literature review types"],
    keyTakeaways: [
      "Choose review type based on question and discipline norms.",
      "Systematic reviews prioritise transparent, reproducible screening.",
      "Narrative reviews prioritise conceptual synthesis and argument.",
      "Hybrid approaches exist but must be justified carefully.",
    ],
    sections: baseSections(
      [
        "Scholars often choose a review style by habit rather than fit. Systematic and narrative reviews answer different scholarly needs. Selecting poorly can either under-power your evidence base or overload your timeline.",
      ],
      [
        {
          heading: "When systematic makes sense",
          paragraphs: [
            "Choose systematic approaches when you need comprehensive coverage, transparent inclusion criteria, and minimised selection bias - common in clinical, policy, and evidence-synthesis contexts.",
          ],
        },
        {
          heading: "When narrative is stronger",
          paragraphs: [
            "Narrative reviews excel when the goal is conceptual development, theoretical positioning, or mapping debates where strict protocol may be less meaningful than critical interpretation.",
          ],
        },
      ],
      [
        "Calling a narrative review “systematic” without protocol evidence",
        "Underestimating screening workload in systematic designs",
        "Failing to justify review choice in methodology",
      ],
      [
        "The best review type is the one that honestly serves your research questions and can be executed rigorously within your constraints.",
      ]
    ).concat([
      {
        id: "comparison-table",
        type: "table",
        heading: "Systematic vs narrative at a glance",
        level: 2,
        paragraphs: [
          "Use this comparison when you write the review-design paragraph in your methodology chapter. Examiners want a justified choice, not a fashionable label.",
        ],
        tableHeaders: ["Dimension", "Systematic review", "Narrative review"],
        tableRows: [
          ["Main purpose", "Minimise selection bias and map all eligible evidence", "Build a conceptual argument and synthesise debates"],
          ["Search process", "Protocol, databases, documented Boolean strings", "Purposive, iterative reading of key conversations"],
          ["Inclusion rules", "Pre-specified inclusion and exclusion criteria", "Flexible, theoretically driven source selection"],
          ["Typical output", "PRISMA-style flow, evidence tables, quality appraisal", "Thematic synthesis and critical narrative"],
          ["Best when", "Clinical, policy, or effectiveness questions", "Theory-building, interdisciplinary, or emerging topics"],
          ["Main risk", "Underestimating screening workload", "Calling it systematic without a protocol"],
        ],
      },
      {
        id: "decision-callout",
        type: "callout",
        heading: "Quick decision rule",
        level: 2,
        paragraphs: [],
        callout:
          "If your examiner will ask “how did you decide which papers count?”, choose a systematic or structured protocol. If they will ask “how does this conversation position your contribution?”, a rigorous narrative review is often stronger.",
      },
      {
        id: "further-reading",
        type: "links",
        heading: "Useful links",
        level: 2,
        paragraphs: [
          "Attach official guidance and tools your reader can open from the page.",
        ],
        links: [
          {
            title: "PRISMA 2020 statement",
            url: "https://www.prisma-statement.org/",
            description: "Reporting standard commonly used for systematic reviews.",
          },
          {
            title: "CogniCode literature review support",
            url: "/services/literature-review",
            description: "Internal service page for scholars who need chapter guidance.",
          },
        ],
      },
    ]),
    serviceCta: {
      title: "Unsure which review design fits your study?",
      description:
        "Get methodology guidance so your literature chapter matches disciplinary expectations and project scope.",
      href: "/services/literature-review",
      buttonLabel: "Get Literature Review Guidance",
    },
  },
  {
    id: "11",
    slug: "choose-right-statistical-test-research-design",
    title: "Choosing the Right Statistical Test for Your Research Design (Decision Guide)",
    excerpt:
      "A plain-language decision path from variable types and design to appropriate statistical tests for thesis research.",
    metaDescription:
      "Decision guide for choosing statistical tests based on research design, variable types, and analysis goals.",
    category: "data-analysis",
    author: authors.lisa,
    date: "May 2, 2026",
    dateISO: "2026-05-02",
    readTime: "11 min read",
    imageGradient: "from-teal-950 via-cyan-900 to-blue-800",
    imageLabel: "Stats Decision",
    keywords: ["which statistical test to use", "research design statistics"],
    keyTakeaways: [
      "Start from question and variable measurement levels.",
      "Design (independent groups, repeated measures, prediction) drives test family.",
      "Assumptions influence whether parametric or alternative tests are appropriate.",
      "Document the decision path in your methodology chapter.",
    ],
    sections: baseSections(
      [
        "Choosing a statistical test becomes straightforward when you slow down and classify your design. Most confusion disappears once you define the outcome variable, predictors or grouping factors, and whether observations are independent or repeated.",
      ],
      [
        {
          heading: "A practical decision sequence",
          paragraphs: [
            "Ask: What is my primary research question? What is the dependent variable type? How many groups or predictors? Are samples paired? Are assumptions tenable? This sequence prevents random test shopping.",
          ],
        },
        {
          heading: "Report the rationale",
          paragraphs: [
            "Examiners appreciate a short justification paragraph: why the test fits the design, which assumptions were checked, and what alternative was considered if assumptions failed.",
          ],
        },
      ],
      [
        "Selecting tests because a peer used them",
        "Ignoring dependence between repeated observations",
        "Multiple unplanned comparisons without correction logic",
      ],
      [
        "Good statistics starts with good design thinking. Write your decision path down - it becomes both analysis plan and methodology defence.",
      ]
    ).concat([
      {
        id: "test-choice-table",
        type: "table",
        heading: "Common test families by design",
        level: 2,
        paragraphs: [
          "This is a starting map, not a substitute for assumption checks. Always confirm variable type, independence, and sample size before locking the analysis plan.",
        ],
        tableHeaders: ["Research situation", "Typical test family", "What to report"],
        tableRows: [
          ["Two independent groups, continuous outcome", "t-test or Mann–Whitney", "Test, statistic, p, effect size, means/medians"],
          ["Three or more independent groups", "ANOVA or Kruskal–Wallis", "Omnibus result plus planned comparisons"],
          ["Paired or repeated measures", "Paired t-test or Wilcoxon / RM-ANOVA", "Change, confidence interval, assumption notes"],
          ["Association between two continuous variables", "Pearson or Spearman correlation", "Coefficient, n, and scatterplot interpretation"],
          ["Predict an outcome from several predictors", "Regression (linear / logistic)", "Coefficients, model fit, diagnostics"],
          ["Categorical association", "Chi-square or Fisher exact", "Table, expected counts, effect measure"],
        ],
      },
    ]),
    resource: {
      title: "Statistical Test Decision Tree",
      description: "One-page visual guide from design features to common test families.",
      fileLabel: "Download decision tree",
    },
    serviceCta: {
      title: "Need help selecting and justifying your analysis plan?",
      description:
        "Our statisticians help scholars choose appropriate tests and report results with academic clarity.",
      href: "/services/statistical-analysis-data-analytics",
      buttonLabel: "Get Analysis Support",
    },
  },
  {
    id: "12",
    slug: "time-management-part-time-phd",
    title: "Time Management System for Working Professionals Doing a Part-Time PhD",
    excerpt:
      "A realistic weekly system for scholars balancing full-time work, research milestones, and sustainable progress.",
    metaDescription:
      "Time management system for part-time PhD scholars balancing full-time work with sustainable research progress.",
    category: "scholar-success",
    author: authors.james,
    date: "April 22, 2026",
    dateISO: "2026-04-22",
    readTime: "7 min read",
    imageGradient: "from-orange-950 via-amber-900 to-yellow-800",
    imageLabel: "Time Systems",
    keywords: ["part time PhD time management", "PhD productivity"],
    keyTakeaways: [
      "Consistency beats occasional marathon weekends.",
      "Protect deep-work blocks for writing and analysis.",
      "Track milestones monthly, not only daily tasks.",
      "Recovery is part of a sustainable doctoral system.",
    ],
    sections: baseSections(
      [
        "Part-time doctoral study is a long game. The scholars who finish are rarely those with perfect weeks; they are those with resilient systems that survive busy seasons at work and home.",
      ],
      [
        {
          heading: "Design a minimum viable research week",
          paragraphs: [
            "Define the smallest weekly commitment that still creates progress - for example two focused 90-minute writing blocks plus one admin block for email, references, and supervisor updates. Protect those blocks like professional meetings.",
          ],
        },
        {
          heading: "Use milestone planning",
          paragraphs: [
            "Break the year into chapter or paper milestones. Review monthly: what moved, what stalled, and what support you need. This prevents the illusion of busywork without scholarly progress.",
          ],
        },
      ],
      [
        "Waiting for large free weekends that rarely arrive",
        "Saying yes to every non-essential work commitment during critical writing phases",
        "Tracking hours without tracking outputs",
      ],
      [
        "A part-time PhD rewards systems thinking. Build a schedule you can repeat for months, measure progress by milestones, and adjust without guilt when life intervenes.",
      ]
    ),
    resource: {
      title: "Weekly PhD Planning Template",
      description: "Simple weekly planner with deep-work blocks and milestone tracker.",
      fileLabel: "Download planner",
    },
    serviceCta: {
      title: "Need structured academic support while working full-time?",
      description:
        "Our mentors help working scholars plan realistic research milestones and chapter delivery.",
      href: "/contact",
      buttonLabel: "Request Guidance",
    },
  },
];

export const freeResources: FreeResource[] = [
  {
    id: "r1",
    title: "Literature Review Matrix Template",
    description: "Compare studies by aim, method, findings, limitations, and gap signals.",
    type: "Excel",
    category: "literature-review",
    href: "/contact",
  },
  {
    id: "r2",
    title: "Thesis Outline Template",
    description: "Chapter-by-chapter outline with purpose prompts for doctoral theses.",
    type: "PDF",
    category: "thesis-writing",
    href: "/contact",
  },
  {
    id: "r3",
    title: "Data Analysis Checklist",
    description: "Assumptions, reporting elements, and interpretation checks for results chapters.",
    type: "Checklist",
    category: "data-analysis",
    href: "/contact",
  },
  {
    id: "r4",
    title: "Journal Selection Scorecard",
    description: "Weighted criteria to shortlist journals and avoid low-quality venues.",
    type: "PDF",
    category: "academic-publishing",
    href: "/contact",
  },
  {
    id: "r5",
    title: "Peer Review Response Letter Template",
    description: "Professional structure for responding to reviewer comments.",
    type: "PDF",
    category: "academic-publishing",
    href: "/contact",
  },
  {
    id: "r6",
    title: "Weekly PhD Planning Template",
    description: "Deep-work planner for full-time professionals pursuing a part-time PhD.",
    type: "Checklist",
    category: "scholar-success",
    href: "/contact",
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getPostsByCategory(slug: BlogCategorySlug | "all"): BlogPost[] {
  if (slug === "all") return blogPosts;
  return blogPosts.filter((p) => p.category === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = blogPosts.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = blogPosts.filter(
    (p) => p.slug !== post.slug && !sameCategory.some((s) => s.slug === p.slug)
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoryName(slug: BlogCategorySlug): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return blogPosts;
  return blogPosts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.metaDescription,
      getCategoryName(post.category),
      post.author.name,
      ...post.keywords,
      ...post.keyTakeaways,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
