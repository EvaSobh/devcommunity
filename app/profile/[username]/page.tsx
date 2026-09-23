const profileData = {
  evasobh: {
    name: "Eva Sobh",
    username: "evasobh",
    bio: "Full-stack developer interested in building clean, useful, and secure web applications.",
    skills: ["Next.js", "TypeScript", "MongoDB", "React"],
    communities: ["Next.js", "React", "MongoDB"],
    posts: [
      "Understanding Server Components in Next.js",
      "Building REST APIs with Node.js",
    ],
  },
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile =
    profileData[username as keyof typeof profileData];

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#0b0d12] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold">Profile not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/10 text-3xl font-bold text-violet-400">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{profile.name}</h1>

              <p className="mt-1 text-gray-500">
                @{profile.username}
              </p>

              <p className="mt-4 max-w-2xl text-gray-400">
                {profile.bio}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Skills</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">
              Joined Communities
            </h2>

            <div className="mt-4 space-y-3">
              {profile.communities.map((community) => (
                <div
                  key={community}
                  className="rounded-xl border border-white/10 px-4 py-3 text-gray-300"
                >
                  {community}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold">
              Published Posts
            </h2>

            <div className="mt-4 space-y-3">
              {profile.posts.map((post) => (
                <div
                  key={post}
                  className="rounded-xl border border-white/10 px-4 py-3 text-gray-300"
                >
                  {post}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}