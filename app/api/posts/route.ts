import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectToDatabase();

    const posts = await Post.find()
      .populate("author", "name username image")
      .populate("community", "name slug")
      .sort({ createdAt: -1 });

    return Response.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Posts error:", error);

    return Response.json({ message: "Failed to get posts" }, { status: 500 });
  }
}

import { auth } from "@/auth";
import User from "@/models/User";
import Community from "@/models/Community";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { title, content, communityId, topics } = body;

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

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

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
