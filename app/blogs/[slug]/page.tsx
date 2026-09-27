import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectToDatabase();

  const post = await Post.findOne({ slug })
    .populate("author", "name username image")
    .populate("community", "name slug")
    .lean();

  if (!post) {
    notFound();
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

          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="my-10 border-t border-white/10" />

        <div className="whitespace-pre-wrap text-lg leading-8 text-gray-300">
          {post.content}
        </div>
      </article>
    </main>
  );
}
