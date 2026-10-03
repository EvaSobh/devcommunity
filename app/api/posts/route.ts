import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import { postSchema } from "@/lib/validation";
import User from "@/models/User";
import Community from "@/models/Community";
import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = 6;

    const search = searchParams.get("search")?.trim() || "";
    const community = searchParams.get("community")?.trim() || "";

    const filter: Record<string, unknown> = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(escapedSearch, "i");

      filter.$or = [{ title: searchRegex }, { topics: searchRegex }];
    }

    if (community && community !== "All") {
      const selectedCommunity = await Community.findOne({
        name: community,
      }).lean();

      if (!selectedCommunity) {
        return Response.json(
          {
            posts: [],
            currentPage: page,
            totalPages: 0,
            totalPosts: 0,
          },
          { status: 200 },
        );
      }

      filter.community = selectedCommunity._id;
    }

    const totalPosts = await Post.countDocuments(filter);

    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find(filter)
      .populate({
        path: "author",
        select: "name username image",
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

    return Response.json(
      {
        posts,
        currentPage: page,
        totalPages,
        totalPosts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Posts error:", error);

    return Response.json({ message: "Failed to get posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = postSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          message: result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { title, content, communityId, topics } = result.data;

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const community = await Community.findById(communityId);

    if (!community) {
      return Response.json({ message: "Community not found" }, { status: 404 });
    }

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    let slug = baseSlug;
    let counter = 1;

    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await Post.create({
      title,
      slug,
      content,
      author: user._id,
      community: community._id,
      topics,
    });

    return Response.json(
      {
        message: "Post created successfully",
        post,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create post error:", error);

    return Response.json({ message: "Failed to create post" }, { status: 500 });
  }
}
