"use client";

import { useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  topics: string[];
  createdAt: string;

  author: {
    name: string;
    username?: string;
  };

  community: {
    name: string;
    slug: string;
  };
};

export default function BlogsClient({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [community, setCommunity] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 3;

  const communityNames = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.community.name))),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.topics.some((topic) =>
        topic.toLowerCase().includes(search.toLowerCase()),
      );

    const matchesCommunity =
      community === "All" || post.community.name === community;

    return matchesSearch && matchesCommunity;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const startIndex = (currentPage - 1) * postsPerPage;

  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          type="text"
          placeholder="Search blogs or topics..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-xl rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 outline-none"
        />

        <select
          value={community}
          onChange={(e) => {
            setCommunity(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded-xl border border-white/10 bg-[#12151c] px-4 py-3"
        >
          {communityNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>

      {filteredPosts.length > 0 ? (
        <>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    {post.community.name}
                  </span>

                  {post.topics.map((topic) => (
                    <span key={topic} className="text-xs text-gray-500">
                      #{topic}
                    </span>
                  ))}
                </div>

                <h2 className="mt-5 text-xl font-semibold">{post.title}</h2>

                <p className="mt-3 flex-1 text-sm leading-6 text-gray-400">
                  {post.content.length > 120
                    ? `${post.content.slice(0, 120)}...`
                    : post.content}
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>By {post.author.name}</span>

                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="mt-4 text-right">
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
            <div className="mt-10 flex justify-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                className="rounded-lg border border-white/10 px-4 py-2 disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-lg ${
                      currentPage === page
                        ? "bg-violet-600"
                        : "border border-white/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                className="rounded-lg border border-white/10 px-4 py-2 disabled:opacity-40"
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
    </>
  );
}
