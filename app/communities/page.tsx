"use client";

import { useState } from "react";
import Link from "next/link";

const communities = [
  {
    name: "React",
    category: "Frontend",
    description:
      "Discuss components, hooks, state management, performance, and modern React development.",
    members: "12.4k",
    topics: ["hooks", "state", "components"],
  },
  {
    name: "Next.js",
    category: "Full Stack",
    description:
      "Explore App Router, Server Components, APIs, rendering, authentication, and deployment.",
    members: "9.8k",
    topics: ["app-router", "server-components", "vercel"],
  },
  {
    name: "TypeScript",
    category: "Language",
    description:
      "Learn safer JavaScript, better typing patterns, reusable types, and scalable project structure.",
    members: "8.1k",
    topics: ["types", "interfaces", "generics"],
  },
  {
    name: "MongoDB",
    category: "Database",
    description:
      "Talk about schemas, queries, indexing, Atlas, Mongoose, and data modeling.",
    members: "6.7k",
    topics: ["mongoose", "atlas", "indexes"],
  },
  {
    name: "JavaScript",
    category: "Language",
    description:
      "Share knowledge about JavaScript fundamentals, ES features, async code, and browser development.",
    members: "15.2k",
    topics: ["javascript", "async", "web"],
  },
  {
    name: "Node.js",
    category: "Backend",
    description:
      "Discuss backend architecture, APIs, packages, authentication, and server-side JavaScript.",
    members: "7.9k",
    topics: ["api", "backend", "node"],
  },
];

export default function CommunitiesPage() {
    const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const filteredCommunities = communities.filter((community) => {
  const matchesSearch =
  community.name.toLowerCase().includes(search.toLowerCase()) ||
  community.topics.some((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  const matchesCategory =
    selectedCategory === "All" ||
    community.category === selectedCategory;

  return matchesSearch && matchesCategory;
});
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-violet-400">
            Explore Communities
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Find your developer community
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-400">
            Discover communities around the technologies you use, learn from
            other developers, and join conversations that interest you.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full max-w-xl items-center rounded-xl border border-white/10 bg-white/[0.03] p-2">
            <input
                type="text"
                placeholder="Search communities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-500"
            />

            <button className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium hover:bg-violet-500">
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Frontend", "Backend", "Database", "Language"].map((filter) => (
  <button
    key={filter}
    onClick={() => setSelectedCategory(filter)}
    className={`rounded-full border px-4 py-2 text-sm transition ${
      selectedCategory === filter
        ? "border-violet-500 bg-violet-500/10 text-violet-300"
        : "border-white/10 text-gray-300 hover:border-violet-500/50 hover:text-white"
    }`}
  >
    {filter}
  </button>
))}
          </div>
        </div>

        {/* Communities */}
        {filteredCommunities.length > 0 ? (
  <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
    {filteredCommunities.map((community) => (
      <article
        key={community.name}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-violet-500/40"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-xl font-bold text-violet-400">
            {community.name.charAt(0)}
          </div>

          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
            {community.category}
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          {community.name}
        </h2>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-400">
          {community.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {community.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs text-gray-400"
            >
              #{topic}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm text-gray-500">
            {community.members} members
          </span>

          <Link
            href={`/communities/${community.name
              .toLowerCase()
              .replace(".", "")}`}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500"
          >
            View Community
          </Link>
        </div>
      </article>
    ))}
  </div>
) : (
  <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
    <h2 className="text-xl font-semibold">
      No communities found
    </h2>

    <p className="mt-2 text-sm text-gray-400">
      Try searching for another community or topic.
    </p>
  </div>
)}
      </section>
    </main>
  );
}