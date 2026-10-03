import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center px-6 py-20">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
                Error 404
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                This page got lost in the code.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-400">
                The page may have been removed, renamed, or the link may be
                incorrect.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
                >
                  Back to Home
                </Link>

                <Link
                  href="/blogs"
                  className="rounded-xl border border-white/10 px-5 py-3 font-medium text-gray-300 transition hover:border-violet-500/50 hover:text-white"
                >
                  Explore Blogs
                </Link>

                <Link
                  href="/communities"
                  className="rounded-xl border border-white/10 px-5 py-3 font-medium text-gray-300 transition hover:border-violet-500/50 hover:text-white"
                >
                  Communities
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-violet-500/20 bg-violet-500/[0.05]">
                <div className="absolute h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative text-center">
                  <p className="text-8xl font-black tracking-tight text-violet-400">
                    404
                  </p>

                  <p className="mt-2 font-mono text-sm text-gray-500">
                    route_not_found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
