"use client";

import { useEffect, useState } from "react";

type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    username?: string;
    image?: string;
  };
};

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadComments() {
    const response = await fetch(`/api/comments?postId=${postId}`);
    const data = await response.json();

    if (response.ok) {
      setComments(data.comments);
    }
  }

  useEffect(() => {
    loadComments();
  }, [postId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to add comment");
        return;
      }

      setContent("");
      setMessage("Comment added successfully");
      await loadComments();
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <h2 className="text-2xl font-bold">Comments</h2>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
        />

        <div className="mt-3 flex items-center justify-between">
          {message && <p className="text-sm text-gray-400">{message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium hover:bg-violet-500 disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment._id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{comment.author.name}</p>

                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {comment.content}
              </p>
            </article>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </section>
  );
}
