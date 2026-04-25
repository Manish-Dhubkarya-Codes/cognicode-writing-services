import { Metadata } from "next";
import SamplesPage from "./SamplesPage";

export const metadata: Metadata = {
  title: "Research Work Samples | CogniCode",
  description:
    "View samples of our academic writing work including thesis, synopsis, research papers, and more.",
};

export default function Page() {
  return <SamplesPage />;
}