"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

type Community = {
  name: string;
  slug: string;
};

type BlogsClientProps = {
  posts: Post[];
  communities: Community[];
  currentPage: number;
  totalPages: number;
  search: string;
  community: string;
};

export default function BlogsClient({
  posts,
  communities,
  currentPage,
  totalPages,
  search,
  community,
}: BlogsClientProps) {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUrl(1, searchValue, communityValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const [communityValue, setCommunityValue] = useState(community);

  function updateUrl(
    page: number,
    newSearch = searchValue,
    newCommunity = communityValue,
  ) {
    const params = new URLSearchParams();

    if (newSearch.trim()) {
      params.set("search", newSearch.trim());
    }

    if (newCommunity !== "All") {
      params.set("community", newCommunity);
    }

    if (page > 1) {
      params.set("page", page.toString());
    }

    const query = params.toString();

    router.push(query ? `/blogs?${query}` : "/blogs");
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateUrl(1);
  }

  function handleCommunityChange(value: string) {
    setCommunityValue(value);

    updateUrl(1, searchValue, value);
  }

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex w-full max-w-xl gap-3">
          <input
            type="text"
            placeholder="Search blogs or topics..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
          >
            Search
          </button>
        </div>

        <select
          value={communityValue}
          onChange={(e) => handleCommunityChange(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#12151c] px-4 py-3"
        >
          <option value="All">All Communities</option>

          {communities.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </form>

      {posts.length > 0 ? (
        <>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
                onClick={() => updateUrl(currentPage - 1)}
                className="rounded-lg border border-white/10 px-4 py-2 disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => updateUrl(page)}
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
                onClick={() => updateUrl(currentPage + 1)}
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
