import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import User from "@/models/User";
import JoinCommunityButton from "@/components/JoinCommunityButton";
import Post from "@/models/Post";
import Link from "next/link";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectToDatabase();

  const community = await Community.findOne({ slug }).lean();

  if (!community) {
    notFound();
  }

  const posts = await Post.find({
    community: community._id,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const session = await auth();

  let initialJoined = false;

  if (session?.user?.email) {
    const user = await User.findOne({
      email: session.user.email,
    }).lean();

    if (user) {
      initialJoined = community.members.some(
        (memberId: { toString: () => string }) =>
          memberId.toString() === user._id.toString(),
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium text-violet-400">Community</p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-bold">{community.name}</h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
                {community.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {community.topics.map((topic: string) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-400"
                  >
                    #{topic}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm text-gray-500">
                {community.members.length} members
              </p>
            </div>

            <JoinCommunityButton
              communityId={community._id.toString()}
              initialJoined={initialJoined}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold">Recent Posts</h2>

        {posts.length > 0 ? (
          <div className="mt-6 space-y-4">
            {posts.map((post) => (
              <article
                key={post._id.toString()}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>

                <p className="mt-3 text-sm text-gray-400">
                  {post.content.length > 120
                    ? `${post.content.slice(0, 120)}...`
                    : post.content}
                </p>

                <div className="mt-4 text-right">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-sm font-medium text-violet-400 hover:text-violet-300"
                  >
                    Read post →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-400">No posts in this community yet.</p>
        )}
      </section>
    </main>
  );
}
