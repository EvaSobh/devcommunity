"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Community = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  topics: string[];
};

type CommunitiesClientProps = {
  communities: Community[];
  categories: string[];
  search: string;
  category: string;
};

export default function CommunitiesClient({
  communities,
  categories,
  search,
  category,
}: CommunitiesClientProps) {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(search);
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateUrl(searchValue, selectedCategory);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue]);
  const [selectedCategory, setSelectedCategory] = useState(category);

  function updateUrl(newSearch = searchValue, newCategory = selectedCategory) {
    const params = new URLSearchParams();

    if (newSearch.trim()) {
      params.set("search", newSearch.trim());
    }

    if (newCategory !== "All") {
      params.set("category", newCategory);
    }

    const query = params.toString();

    router.push(query ? `/communities?${query}` : "/communities");
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateUrl();
  }

  function handleCategoryChange(newCategory: string) {
    setSelectedCategory(newCategory);

    updateUrl(searchValue, newCategory);
  }

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-3">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-gray-500 focus:border-violet-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium hover:bg-violet-500"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              selectedCategory === "All"
                ? "border-violet-500 bg-violet-500/10 text-violet-300"
                : "border-white/10 text-gray-300 hover:border-violet-500/50 hover:text-white"
            }`}
          >
            All
          </button>

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => handleCategoryChange(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === item
                  ? "border-violet-500 bg-violet-500/10 text-violet-300"
                  : "border-white/10 text-gray-300 hover:border-violet-500/50 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {communities.length > 0 ? (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <article
              key={community._id}
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

              <h2 className="mt-6 text-2xl font-semibold">{community.name}</h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
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

              <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-5">
                <Link
                  href={`/communities/${community.slug}`}
                  className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
                >
                  View Community
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">No communities found</h2>

          <p className="mt-2 text-sm text-gray-400">
            Try searching for another community or topic.
          </p>
        </div>
      )}
    </>
  );
}
