import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import Community from "@/models/Community";
import User from "@/models/User";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";
import CommentsSection from "@/components/CommentsSection";
import BookmarkButton from "@/components/BookmarkButton";
import Bookmark from "@/models/Bookmark";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectToDatabase();

  const post = await Post.findOne({ slug })
    .populate({
      path: "author",
      select: "name username image email",
      model: User,
    })
    .populate({
      path: "community",
      select: "name slug",
      model: Community,
    })
    .lean();

  if (!post) {
    notFound();
  }

  const session = await auth();

  const isOwner =
    session?.user?.email && post.author?.email === session.user.email;

  let initialBookmarked = false;

  if (session?.user?.email) {
    const currentUser = await User.findOne({
      email: session.user.email,
    }).lean();

    if (currentUser) {
      const existingBookmark = await Bookmark.findOne({
        user: currentUser._id,
        post: post._id,
      }).lean();

      initialBookmarked = !!existingBookmark;
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <article className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
            {post.community.name}
          </span>

          {post.topics.map((topic: string) => (
            <span key={topic} className="text-sm text-gray-500">
              #{topic}
            </span>
          ))}
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>By {post.author.name}</span>

          <span>
            Published: {new Date(post.createdAt).toLocaleDateString()}
          </span>

          {new Date(post.updatedAt).getTime() -
            new Date(post.createdAt).getTime() >
            1000 && (
            <span>
              Updated: {new Date(post.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {isOwner && (
          <div className="mt-6 flex gap-3">
            <Link
              href={`/edit/${post._id.toString()}`}
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
            >
              Edit Post
            </Link>

            <DeletePostButton postId={post._id.toString()} />
          </div>
        )}

        <div className="mt-4">
          <BookmarkButton
            postId={post._id.toString()}
            initialBookmarked={initialBookmarked}
          />
        </div>

        <div className="my-10 border-t border-white/10" />

        <div className="whitespace-pre-wrap text-lg leading-8 text-gray-300">
          {post.content}
        </div>

        <CommentsSection
          postId={post._id.toString()}
          isSignedIn={!!session?.user?.email}
        />
      </article>
    </main>
  );
}
