export interface SEOPage {
  slug: string;
  keyword: string;
  meta_title: string;
  meta_desc: string;
  h1: string;
  content: string; // HTML content
  faqs: {
    question: string;
    answer: string;
  }[];
  parentToolId: string;
}
