"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleaned = search.trim();

    if (!cleaned) {
      return;
    }

    router.push(`/blogs?search=${encodeURIComponent(cleaned)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex w-full max-w-2xl items-center rounded-xl border border-white/10 bg-white/5 p-2"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search blogs or topics..."
        className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
      />

      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium hover:bg-violet-500"
      >
        Search
      </button>
    </form>
  );
}
