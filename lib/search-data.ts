export type SearchItem = {
title: string;
description: string;
href: string;
keywords: string[];
};

export const searchData: SearchItem[] = [
{
title: "PhD Thesis Writing",
description: "Complete thesis writing support from topic to submission.",
href: "/services/phd-thesis-writing",
keywords: ["phd", "thesis", "research", "dissertation", "writing"]
},
{
title: "Research Paper Writing",
description: "High quality research papers for Scopus and SCI journals.",
href: "/services/research-paper-writing",
keywords: ["research", "paper", "journal", "scopus"]
},
{
title: "Journal Writing",
description: "Professional academic journal writing services.",
href: "/services/journal-writing",
keywords: ["journal", "publication", "academic"]
},
{
title: "Literature Review",
description: "Detailed literature review with proper references.",
href: "/services/literature-review",
keywords: ["literature", "review", "research"]
},
{
title: "Blog",
description: "Explore academic writing tips and guides.",
href: "/blog",
keywords: ["blog", "articles", "guides"]
},
{
title: "Contact",
description: "Reach our experts for consultation.",
href: "/contact",
keywords: ["contact", "help", "support"]
}
];
