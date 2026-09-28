"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Post = {
  _id: string;
  title: string;
  content: string;
  topics: string[];
  slug: string;
};

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [topics, setTopics] = useState(post.topics.join(", "));
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setIsSaving(true);

    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          topics: topics
            .split(",")
            .map((topic) => topic.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update post");
        return;
      }

      setMessage("Post updated successfully");

      router.replace(`/blogs/${data.post.slug}`);
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setIsSaving(false);
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
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">Topics</label>

        <input
          type="text"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">Content</label>

        <textarea
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />
      </div>

      {message && <p className="text-sm text-gray-300">{message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
