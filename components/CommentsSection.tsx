"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { commentSchema, updateCommentSchema } from "@/lib/validation";

type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  author: {
    name: string;
    username?: string;
    image?: string;
  };

  isOwner: boolean;
};

export default function CommentsSection({
  postId,
  isSignedIn,
}: {
  postId: string;
  isSignedIn: boolean;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const loadComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);

      const data = await response.json();

      if (response.ok) {
        setComments(data.comments);
      }
    } catch {
      setMessage("Failed to load comments.");
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    const commentData = {
      postId,
      content,
    };

    // CLIENT-SIDE ZOD VALIDATION
    const result = commentSchema.safeParse(commentData);

    if (!result.success) {
      setMessage(
        result.error.issues[0]?.message || "Please check your comment.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create comment.");
        return;
      }

      setContent("");
      setMessage("");

      await loadComments();
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function startEditing(comment: Comment) {
    setEditingId(comment._id);
    setEditContent(comment.content);
    setMessage("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditContent("");
    setMessage("");
  }

  async function saveEdit(commentId: string) {
    setMessage("");

    const editData = {
      content: editContent,
    };

    // CLIENT-SIDE ZOD VALIDATION
    const result = updateCommentSchema.safeParse(editData);

    if (!result.success) {
      setMessage(
        result.error.issues[0]?.message || "Please check your comment.",
      );
      return;
    }

    setIsSavingEdit(true);

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update comment.");
        return;
      }

      setEditingId(null);
      setEditContent("");
      setMessage("");

      await loadComments();
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setIsSavingEdit(false);
    }
  }

  async function deleteComment(commentId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed) {
      return;
    }

    setMessage("");

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to delete comment.");
        return;
      }

      await loadComments();
    } catch {
      setMessage("Something went wrong.");
    }
  }

  function wasEdited(comment: Comment) {
    return (
      new Date(comment.updatedAt).getTime() -
        new Date(comment.createdAt).getTime() >
      1000
    );
  }

  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <h2 className="text-2xl font-semibold">Comments</h2>

      {/* CREATE COMMENT */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-violet-600 px-5 py-2.5 font-medium hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-gray-400">
            <Link
              href="/signin"
              className="font-medium text-violet-400 hover:text-violet-300"
            >
              Sign in
            </Link>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {message && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {message}
        </div>
      )}

      {/* COMMENTS LIST */}
      <div className="mt-10 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment._id}
              className={`rounded-2xl border p-5 ${
                comment.isOwner
                  ? "border-violet-500/30 bg-violet-500/[0.04]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{comment.author.name}</p>

                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>

                    {wasEdited(comment) && (
                      <span>
                        • Updated:{" "}
                        {new Date(comment.updatedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {comment.isOwner && (
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => startEditing(comment)}
                      className="text-violet-400 hover:text-violet-300"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteComment(comment._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* EDIT COMMENT */}
              {editingId === comment._id ? (
                <div className="mt-4">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-[#0b0d12] px-4 py-3 outline-none focus:border-violet-500"
                  />

                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      disabled={isSavingEdit}
                      onClick={() => saveEdit(comment._id)}
                      className="rounded-lg bg-violet-600 px-4 py-2 text-sm hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSavingEdit ? "Saving..." : "Save"}
                    </button>

                    <button
                      type="button"
                      disabled={isSavingEdit}
                      onClick={cancelEditing}
                      className="rounded-lg border border-white/10 px-4 py-2 text-sm disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 whitespace-pre-wrap text-gray-300">
                  {comment.content}
                </p>
              )}
            </article>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment.
          </p>
        )}
      </div>
    </section>
  );
}
