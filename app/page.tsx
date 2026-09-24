import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
        <div className="mb-5 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
          A community built for developers
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Learn. Share.
          <span className="text-violet-400"> Build together.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Discover developer communities, explore technical content, share your
          knowledge, and connect with developers.
        </p>

        <div className="mt-10 flex w-full max-w-2xl items-center rounded-xl border border-white/10 bg-white/5 p-2">
          <input
            type="text"
            placeholder="Search blogs, communities, or topics..."
            className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
          />

          <button className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium hover:bg-violet-500">
            Search
          </button>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-violet-400">Discover</p>
            <h2 className="mt-2 text-3xl font-bold">Featured Communities</h2>
            <p className="mt-2 text-gray-400">
              Join communities built around the technologies you care about.
            </p>
          </div>

          <a
            href="#"
            className="hidden text-sm font-medium text-violet-400 hover:text-violet-300 md:block"
          >
            View all communities →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "React",
              tag: "Frontend",
              description:
                "Discuss components, hooks, state management, and modern React development.",
              members: "12.4k",
            },
            {
              name: "Next.js",
              tag: "Full Stack",
              description:
                "Explore App Router, Server Components, APIs, rendering, and deployment.",
              members: "9.8k",
            },
            {
              name: "TypeScript",
              tag: "Language",
              description:
                "Learn better typing, scalable patterns, and safer JavaScript development.",
              members: "8.1k",
            },
            {
              name: "MongoDB",
              tag: "Database",
              description:
                "Talk about schemas, queries, indexing, Atlas, and data modeling.",
              members: "6.7k",
            },
          ].map((community) => (
            <article
              key={community.name}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.05]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-lg font-bold text-violet-400">
                  {community.name.charAt(0)}
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                  {community.tag}
                </span>
              </div>

              <h3 className="text-xl font-semibold">{community.name}</h3>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-400">
                {community.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-gray-500">
                  {community.members} members
                </span>

                <button className="text-sm font-medium text-violet-400 transition group-hover:text-violet-300">
                  Explore →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/*Latest Blogs + Trending Topics*/}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Latest Blogs */}
          <div>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-violet-400">
                  Read & Learn
                </p>
                <h2 className="mt-2 text-3xl font-bold">Latest Blogs</h2>
                <p className="mt-2 text-gray-400">
                  Explore recent articles shared by the developer community.
                </p>
              </div>

              <a
                href="#"
                className="hidden text-sm font-medium text-violet-400 hover:text-violet-300 md:block"
              >
                View all blogs →
              </a>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Understanding Server Components in Next.js",
                  excerpt:
                    "Learn when Server Components make sense and how they improve your application architecture.",
                  author: "Sarah Ahmed",
                  community: "Next.js",
                  readTime: "5 min read",
                },
                {
                  title: "MongoDB Relationships: Embed or Reference?",
                  excerpt:
                    "A practical look at designing MongoDB relationships based on real application access patterns.",
                  author: "Alex Martin",
                  community: "MongoDB",
                  readTime: "8 min read",
                },
                {
                  title: "Why TypeScript Makes Large Projects Safer",
                  excerpt:
                    "Explore how TypeScript improves maintainability and catches common problems before runtime.",
                  author: "Maya Chen",
                  community: "TypeScript",
                  readTime: "6 min read",
                },
              ].map((post) => (
                <article
                  key={post.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/40 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">
                      {post.community}
                    </span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold transition hover:text-violet-300">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {post.author}
                    </span>

                    <button className="text-sm font-medium text-violet-400 hover:text-violet-300">
                      Read post →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <aside>
            <div className="mb-8">
              <p className="text-sm font-medium text-violet-400">Popular Now</p>
              <h2 className="mt-2 text-3xl font-bold">Trending Topics</h2>
              <p className="mt-2 text-gray-400">
                Discover what developers are talking about.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="space-y-3">
                {[
                  { topic: "nextjs", posts: 142 },
                  { topic: "typescript", posts: 118 },
                  { topic: "react", posts: 104 },
                  { topic: "mongodb", posts: 87 },
                  { topic: "javascript", posts: 79 },
                  { topic: "webdevelopment", posts: 63 },
                ].map((item, index) => (
                  <div
                    key={item.topic}
                    className="flex items-center justify-between rounded-xl border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-medium text-gray-200">
                        #{item.topic}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      {item.posts} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/*footer*/}

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-bold">
              Dev<span className="text-violet-400">Community</span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Learn, share, and grow with developers.
            </p>
          </div>

          <Link href="/communities" className="hover:text-white">
            Communities
          </Link>

          <Link href="/blogs" className="hover:text-white">
            Blogs
          </Link>

          <Link href="/profile/evasobh" className="hover:text-white">
            Developers
          </Link>

          <Link href="/" className="hover:text-white">
            About
          </Link>

          <div className="text-sm text-gray-600">
            <p>© 2026 DevCommunity</p>
            <p className="mt-1">
              Designed & developed by{" "}
              <span className="font-medium text-violet-400">Eva Sobh</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
