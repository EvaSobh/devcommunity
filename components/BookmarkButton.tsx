"use client";

import { useState } from "react";

export default function BookmarkButton({ postId }: { postId: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleBookmark() {
    setLoading(true);

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update bookmark");
        return;
      }

      setBookmarked(data.bookmarked);
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:border-violet-500 hover:text-white disabled:opacity-50"
    >
      {loading ? "Saving..." : bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
