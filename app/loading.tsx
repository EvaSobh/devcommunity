export default function Loading() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="animate-pulse">
          <div className="max-w-3xl">
            <div className="h-4 w-32 rounded-full bg-violet-500/20" />

            <div className="mt-5 h-12 w-3/4 rounded-xl bg-white/10" />

            <div className="mt-4 h-5 w-2/3 rounded-lg bg-white/[0.07]" />

            <div className="mt-2 h-5 w-1/2 rounded-lg bg-white/[0.07]" />
          </div>

          <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="h-14 w-full max-w-xl rounded-xl border border-white/10 bg-white/[0.03]" />

            <div className="h-12 w-48 rounded-xl border border-white/10 bg-white/[0.03]" />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex justify-between">
                  <div className="h-10 w-10 rounded-xl bg-violet-500/10" />
                  <div className="h-6 w-20 rounded-full bg-white/10" />
                </div>

                <div className="mt-6 h-6 w-2/3 rounded-lg bg-white/10" />

                <div className="mt-4 h-4 w-full rounded bg-white/[0.07]" />
                <div className="mt-2 h-4 w-5/6 rounded bg-white/[0.07]" />

                <div className="mt-6 flex gap-2">
                  <div className="h-6 w-16 rounded-md bg-white/[0.06]" />
                  <div className="h-6 w-20 rounded-md bg-white/[0.06]" />
                </div>

                <div className="mt-8 h-px bg-white/10" />

                <div className="mt-5 h-9 w-32 rounded-lg bg-violet-500/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
