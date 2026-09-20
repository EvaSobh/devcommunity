const communityData = {
  react: {
    name: "React",
    description:
      "A community for developers learning and building with React.",
    members: "12.4k",
    topics: ["hooks", "state", "components"],
  },
  nextjs: {
    name: "Next.js",
    description:
      "Discuss App Router, Server Components, APIs, rendering, and deployment.",
    members: "9.8k",
    topics: ["app-router", "server-components", "vercel"],
  },
  typescript: {
    name: "TypeScript",
    description:
      "Learn safer JavaScript with strong typing and scalable development patterns.",
    members: "8.1k",
    topics: ["types", "interfaces", "generics"],
  },
  mongodb: {
  name: "MongoDB",
  description:
    "Discuss schemas, queries, indexing, Atlas, Mongoose, and data modeling.",
  members: "6.7k",
  topics: ["mongoose", "atlas", "indexes"],
},

javascript: {
  name: "JavaScript",
  description:
    "Explore JavaScript fundamentals, modern syntax, asynchronous programming, and web development.",
  members: "15.2k",
  topics: ["javascript", "async", "web"],
},

nodejs: {
  name: "Node.js",
  description:
    "Discuss backend development, APIs, authentication, packages, and server-side JavaScript.",
  members: "7.9k",
  topics: ["api", "backend", "node"],
},
};

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const community =
    communityData[slug as keyof typeof communityData];

  if (!community) {
    return (
      <main className="min-h-screen bg-[#0b0d12] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">Community not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium text-violet-400">
            Community
          </p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-bold">
                {community.name}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">
                {community.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {community.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-400"
                  >
                    #{topic}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm text-gray-500">
                {community.members} members
              </p>
            </div>

            <button className="rounded-lg bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500">
              Join Community
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold">Recent Posts</h2>

        <div className="mt-6 space-y-4">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-violet-400">
              #{community.name.toLowerCase()}
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Getting started with {community.name}
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              A beginner-friendly guide shared by the community.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-violet-400">
              #{community.name.toLowerCase()}
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Best practices developers should know
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              Community tips and practical development patterns.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}