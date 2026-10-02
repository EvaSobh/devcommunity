import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import Bookmark from "@/models/Bookmark";
import Community from "@/models/Community";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectToDatabase();

  const user = await User.findOne({
    email: session.user.email,
  }).lean();

  if (!user) {
    redirect("/");
  }

  const posts = await Post.find({
    author: user._id,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const postCount = await Post.countDocuments({
    author: user._id,
  });

  const bookmarkCount = await Bookmark.countDocuments({
    user: user._id,
  });

  const joinedCommunities = await Community.find({
    _id: { $in: user.joinedCommunities || [] },
  })
    .sort({ name: 1 })
    .lean();

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-400">Dashboard</p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome back, {user.name || "Developer"}
            </h1>

            <p className="mt-3 text-gray-400">
              Manage your posts, communities, and saved content.
            </p>
          </div>

          <Link
            href="/create"
            className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
          >
            + Create Post
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">Published Posts</p>

            <p className="mt-2 text-3xl font-bold">{postCount}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">Joined Communities</p>

            <p className="mt-2 text-3xl font-bold">
              {joinedCommunities.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">Bookmarks</p>

            <p className="mt-2 text-3xl font-bold">{bookmarkCount}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Posts</h2>

              <Link
                href="/blogs"
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Link
                    key={post._id.toString()}
                    href={`/blogs/${post.slug}`}
                    className="block rounded-xl border border-white/10 p-4 hover:border-violet-500/50"
                  >
                    <p className="font-medium">{post.title}</p>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">
                  You have not published any posts yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Communities</h2>

              <Link
                href="/communities"
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                Explore
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {joinedCommunities.length > 0 ? (
                joinedCommunities.map((community) => (
                  <Link
                    key={community._id.toString()}
                    href={`/communities/${community.slug}`}
                    className="block rounded-xl border border-white/10 p-4 hover:border-violet-500/50"
                  >
                    <p className="font-medium">{community.name}</p>

                    <p className="mt-1 text-sm text-gray-500">
                      {community.description}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">
                  You have not joined any communities yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
