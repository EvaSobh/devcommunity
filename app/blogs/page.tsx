import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import BlogsClient from "@/components/BlogsClient";
import Community from "@/models/Community";
import User from "@/models/User";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    community?: string;
  }>;
}) {
  await connectToDatabase();

  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const limit = 6;

  const search = params.search?.trim() || "";
  const community = params.community?.trim() || "All";

  const filter: Record<string, unknown> = {};

  if (search) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const searchRegex = new RegExp(escapedSearch, "i");

    filter.$or = [{ title: searchRegex }, { topics: searchRegex }];
  }

  if (community !== "All") {
    const selectedCommunity = await Community.findOne({
      name: community,
    }).lean();

    if (selectedCommunity) {
      filter.community = selectedCommunity._id;
    } else {
      filter.community = null;
    }
  }

  const totalPosts = await Post.countDocuments(filter);

  const totalPages = Math.ceil(totalPosts / limit);

  const posts = await Post.find(filter)
    .populate({
      path: "author",
      select: "name username",
      model: User,
    })
    .populate({
      path: "community",
      select: "name slug",
      model: Community,
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const communities = await Community.find().sort({ name: 1 }).lean();

  const safePosts = posts.map((post) => ({
    _id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    topics: post.topics,
    createdAt: post.createdAt.toISOString(),

    author: {
      name: post.author.name,
      username: post.author.username,
    },

    community: {
      name: post.community.name,
      slug: post.community.slug,
    },
  }));

  const safeCommunities = communities.map((item) => ({
    name: item.name,
    slug: item.slug,
  }));

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-violet-400">Explore Blogs</p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Learn from the developer community
          </h1>

          <p className="mt-4 text-lg leading-8 text-gray-400">
            Discover technical articles, practical guides, and ideas shared by
            developers across different communities.
          </p>
        </div>

        <BlogsClient
          posts={safePosts}
          communities={safeCommunities}
          currentPage={page}
          totalPages={totalPages}
          search={search}
          community={community}
        />
      </section>
    </main>
  );
}
