"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center px-6 py-20">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <span className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-sm font-medium text-red-300">
                Application Error
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                Something went wrong.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-400">
                DevCommunity couldn&apos;t complete this request. You can try
                loading the page again.
              </p>

              <button
                onClick={reset}
                className="mt-8 rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
              >
                Try Again
              </button>

              {process.env.NODE_ENV === "development" && (
                <p className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-sm text-gray-500">
                  {error.message}
                </p>
              )}
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/[0.04]">
                <div className="absolute h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

                <div className="relative text-center">
                  <p className="font-mono text-6xl font-black text-red-400">
                    !
                  </p>

                  <p className="mt-4 font-mono text-sm text-gray-500">
                    request_failed
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
