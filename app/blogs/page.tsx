import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import BlogsClient from "@/components/BlogsClient";
import Community from "@/models/Community";
import User from "@/models/User";

export default async function BlogsPage() {
  await connectToDatabase();

  const posts = await Post.find()
    .populate({
      path: "author",
      select: "name username",
      model: User,
    })
    .populate({
      path: "community",
      select: "name slug",
      model: Community,
    })
    .sort({ createdAt: -1 })
    .lean();

  const safePosts = posts.map((post) => ({
    _id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    topics: post.topics,
    createdAt: post.createdAt.toISOString(),

    author: {
      name: post.author.name,
      username: post.author.username,
    },

    community: {
      name: post.community.name,
      slug: post.community.slug,
    },
  }));

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-violet-400">Explore Blogs</p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Learn from the developer community
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-400">
            Discover technical articles, practical guides, and ideas shared by
            developers across different communities.
          </p>
        </div>

        <BlogsClient posts={safePosts} />
      </section>
    </main>
  );
}
