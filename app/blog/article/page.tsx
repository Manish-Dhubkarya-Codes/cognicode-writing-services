import { Metadata } from "next";
import { ArticleLoader } from "@/components/blog/article-loader";

export const metadata: Metadata = {
  title: "Article | CogniCode Blog",
  description:
    "Read CogniCode EduTech research insights, company updates, and practical scholar guides.",
  robots: {
    index: true,
    follow: true,
  },
};

/** Client-loaded article route for admin/API posts: /blog/article/?slug=... */
export default function DynamicBlogArticlePage() {
  return <ArticleLoader />;
}
