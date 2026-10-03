import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Post from "@/models/Post";
import Community from "@/models/Community";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const normalizedUsername = username.trim().toLowerCase();

  await connectToDatabase();

  const user = await User.findOne({
    username: normalizedUsername,
  }).lean();

  if (!user) {
    notFound();
  }

  const posts = await Post.find({
    author: user._id,
  })
    .populate({
      path: "community",
      select: "name slug",
      model: Community,
    })
    .sort({ createdAt: -1 })
    .lean();

  const joinedCommunities = await Community.find({
    _id: {
      $in: user.joinedCommunities || [],
    },
  })
    .sort({ name: 1 })
    .lean();

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        {/* Profile information */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div>
            <p className="text-sm text-violet-400">@{user.username}</p>

            <h1 className="mt-2 text-4xl font-bold">{user.name}</h1>

            <p className="mt-4 max-w-2xl text-gray-400">
              {user.bio || "No bio added yet."}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {user.skills?.length ? (
              user.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Joined Communities */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Joined Communities</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {joinedCommunities.length > 0 ? (
              joinedCommunities.map((community) => (
                <Link
                  key={community._id.toString()}
                  href={`/communities/${community.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-500/50"
                >
                  <p className="font-semibold">{community.name}</p>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {community.description}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No joined communities yet.</p>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold">Posts</h2>

          <div className="mt-6 space-y-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post._id.toString()}
                  href={`/blogs/${post.slug}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/50"
                >
                  <p className="text-sm text-violet-400">
                    {post.community?.name}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>

                  <p className="mt-2 line-clamp-2 text-gray-400">
                    {post.content}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
