import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";
import { notFound } from "next/navigation";

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

            <button className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500">
              Join Community
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold">Recent Posts</h2>

        <p className="mt-4 text-gray-400">Community posts will appear here.</p>
      </section>
    </main>
  );
}
