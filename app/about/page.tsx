import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-medium text-violet-400">
          About DevCommunity
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          A place for developers to learn, share, and build together.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          DevCommunity is a developer-focused platform for discovering technical
          communities, publishing articles, discussing ideas, and building a
          public developer profile.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">Learn</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Explore technical blogs, topics, and communities built around
              modern technologies.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">Share</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Publish your own technical posts and discuss ideas with other
              developers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">Connect</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Join communities and build a public profile that reflects your
              interests and skills.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/communities"
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
          >
            Explore Communities
          </Link>

          <Link
            href="/blogs"
            className="rounded-xl border border-white/10 px-5 py-3 font-medium text-gray-300 hover:border-violet-500/50 hover:text-white"
          >
            Read Blogs
          </Link>
        </div>
      </section>
    </main>
  );
}
