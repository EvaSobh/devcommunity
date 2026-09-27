"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Community = {
  _id: string;
  name: string;
};

export default function CreatePostForm({
  communities,
}: {
  communities: Community[];
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [topics, setTopics] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          communityId,
          topics: topics
            .split(",")
            .map((topic) => topic.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create post");
        return;
      }

      setMessage("Post created successfully!");

      router.push(`/blogs/${data.post.slug}`);
      router.refresh();
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div>
        <label className="mb-2 block text-sm text-gray-300">Post title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your post title"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">Community</label>

        <select
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#12151c] px-4 py-3 outline-none focus:border-violet-500"
        >
          <option value="">Select community</option>

          {communities.map((community) => (
            <option key={community._id} value={community._id}>
              {community.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">Topics</label>

        <input
          type="text"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          placeholder="Example: nextjs, server-components"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />

        <p className="mt-2 text-xs text-gray-500">
          Separate topics with commas.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">Content</label>

        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />
      </div>

      {message && <p className="text-sm text-gray-300">{message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
