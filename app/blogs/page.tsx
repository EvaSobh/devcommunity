"use client";

import { useState } from "react";
import Link from "next/link";

const posts = [
  {
    title: "Understanding Server Components in Next.js",
    slug: "understanding-server-components",
    excerpt:
      "Learn when Server Components make sense and how they improve your application architecture.",
    author: "Sarah Ahmed",
    community: "Next.js",
    topic: "server-components",
    readTime: "5 min read",
    date: "Sep 20, 2026",
  },
  {
    title: "MongoDB Relationships: Embed or Reference?",
    slug: "mongodb-embed-vs-reference",
    excerpt:
      "A practical look at designing MongoDB relationships based on real application access patterns.",
    author: "Alex Martin",
    community: "MongoDB",
    topic: "data-modeling",
    readTime: "8 min read",
    date: "Sep 18, 2026",
  },
  {
    title: "Why TypeScript Makes Large Projects Safer",
    slug: "typescript-large-projects",
    excerpt:
      "Explore how TypeScript improves maintainability and catches common problems before runtime.",
    author: "Maya Chen",
    community: "TypeScript",
    topic: "types",
    readTime: "6 min read",
    date: "Sep 16, 2026",
  },
  {
    title: "React Hooks You Should Understand",
    slug: "react-hooks-guide",
    excerpt:
      "A simple guide to useState, useEffect, and other hooks used in modern React applications.",
    author: "Daniel Lee",
    community: "React",
    topic: "hooks",
    readTime: "7 min read",
    date: "Sep 14, 2026",
  },
  {
    title: "Building REST APIs with Node.js",
    slug: "building-rest-apis-nodejs",
    excerpt:
      "Understand routes, status codes, request handling, and API structure with Node.js.",
    author: "Omar Khalil",
    community: "Node.js",
    topic: "api",
    readTime: "9 min read",
    date: "Sep 12, 2026",
  },
  {
    title: "JavaScript Async/Await Explained Simply",
    slug: "javascript-async-await",
    excerpt:
      "Understand asynchronous JavaScript and how async/await makes promise-based code easier to read.",
    author: "Nina George",
    community: "JavaScript",
    topic: "async",
    readTime: "5 min read",
    date: "Sep 10, 2026",
  },
];

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 3;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.topic.toLowerCase().includes(search.toLowerCase());

    const matchesCommunity =
      community === "All" || post.community === community;

    return matchesSearch && matchesCommunity;
  });

  const startIndex = (currentPage - 1) * postsPerPage;

  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-violet-400">
            Explore Blogs
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Learn from the developer community
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-400">
            Discover technical articles, practical guides, and ideas shared by
            developers across different communities.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-xl items-center rounded-xl border border-white/10 bg-white/[0.03] p-2">
            <input
              type="text"
              placeholder="Search blogs or topics..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500"
            />
          </div>

          <select
            value={community}
            onChange={(e) => {
              setCommunity(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-white/10 bg-[#12151c] px-4 py-3 text-sm text-gray-300 outline-none"
          >
            <option>All</option>
            <option>React</option>
            <option>Next.js</option>
            <option>TypeScript</option>
            <option>MongoDB</option>
            <option>Node.js</option>
            <option>JavaScript</option>
          </select>
        </div>

        {filteredPosts.length > 0 ? (
          <>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-violet-500/40"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                      {post.community}
                    </span>

                    <span className="text-xs text-gray-500">
                      #{post.topic}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold leading-7">
                    {post.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-6 text-gray-400">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        {post.date}
                      </span>

                      <Link
                        href={`/blogs/${post.slug}`}
                        className="text-sm font-medium text-violet-400 hover:text-violet-300"
                      >
                        Read post →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 w-10 rounded-lg text-sm ${
                        currentPage === page
                          ? "bg-violet-600 text-white"
                          : "border border-white/10 text-gray-300 hover:border-violet-500"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(page + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">No blogs found</h2>

            <p className="mt-2 text-sm text-gray-400">
              Try another search term or community.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}