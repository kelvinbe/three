// app/articles/page.tsx
import Link from "next/link";

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "Understanding React 18",
    summary: "Learn about new features in React 18 including concurrent rendering.",
    slug: "understanding-react-18",
  },
  {
    id: 2,
    title: "Next.js App Router Basics",
    summary: "A beginner's guide to using the new App Router in Next.js 13.",
    slug: "nextjs-app-router-basics",
  },
  {
    id: 3,
    title: "TypeScript Tips for Beginners",
    summary: "Practical tips for writing better TypeScript code.",
    slug: "typescript-tips-for-beginners",
  },
];

export default function Articles() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.id} className="border p-4 rounded-md hover:shadow-lg transition">
            <Link href={`/articles/${article.slug}`}>
        
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}