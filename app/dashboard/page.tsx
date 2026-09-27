import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-400">Dashboard</p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome back, {session.user?.name || "Developer"}
            </h1>

            <p className="mt-3 text-gray-400">
              Manage your posts, communities, and saved content.
            </p>
          </div>

          <Link
            href="/create"
            className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
          >
            + Create Post
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">Published Posts</p>
            <p className="mt-2 text-3xl font-bold">2</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">Joined Communities</p>
            <p className="mt-2 text-3xl font-bold">3</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">Bookmarks</p>
            <p className="mt-2 text-3xl font-bold">4</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">Your Posts</h2>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-white/10 p-4">
                Understanding Server Components in Next.js
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                Building REST APIs with Node.js
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">Your Communities</h2>

            <div className="mt-5 space-y-3">
              {["React", "Next.js", "MongoDB"].map((community) => (
                <div
                  key={community}
                  className="rounded-xl border border-white/10 p-4"
                >
                  {community}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
