import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";
import CommunitiesClient from "@/components/CommunitiesClient";

export default async function CommunitiesPage() {
  await connectToDatabase();

  const communities = await Community.find().lean();

  const safeCommunities = communities.map((community) => ({
    _id: community._id.toString(),
    name: community.name,
    slug: community.slug,
    description: community.description,
    category: community.category,
    topics: community.topics,
  }));

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-violet-400">
            Explore Communities
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Find your developer community
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-400">
            Discover communities around the technologies you use, learn from
            other developers, and join conversations that interest you.
          </p>
        </div>

        <CommunitiesClient communities={safeCommunities} />
      </section>
    </main>
  );
}
