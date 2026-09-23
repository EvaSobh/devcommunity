import Link from "next/link";

const bookmarkedPosts = [
  {
    title: "Understanding Server Components in Next.js",
    slug: "understanding-server-components",
    community: "Next.js",
    author: "Sarah Ahmed",
    readTime: "5 min read",
  },
  {
    title: "MongoDB Relationships: Embed or Reference?",
    slug: "mongodb-embed-vs-reference",
    community: "MongoDB",
    author: "Alex Martin",
    readTime: "8 min read",
  },
];

export default function BookmarksPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div>
          <p className="text-sm font-medium text-violet-400">Bookmarks</p>

          <h1 className="mt-2 text-4xl font-bold">Saved posts</h1>

          <p className="mt-3 text-gray-400">
            Posts you saved to read again later.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {bookmarkedPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">
                  {post.community}
                </span>

                <span className="text-gray-500">{post.readTime}</span>
              </div>

              <h2 className="mt-4 text-xl font-semibold">{post.title}</h2>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-gray-500">By {post.author}</span>

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
      </section>
    </main>
  );
}
