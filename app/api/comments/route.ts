import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return Response.json({ message: "Post ID is required" }, { status: 400 });
    }

    const comments = await Comment.find({ post: postId })
      .populate({
        path: "author",
        select: "name username image",
        model: User,
      })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Get comments error:", error);

    return Response.json(
      { message: "Failed to get comments" },
      { status: 500 },
    );
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
    const { postId, content } = body;

    if (!postId || !content?.trim()) {
      return Response.json(
        { message: "Post ID and comment are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const comment = await Comment.create({
      content: content.trim(),
      author: user._id,
      post: postId,
    });

    return Response.json(
      {
        message: "Comment created successfully",
        comment,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create comment error:", error);

    return Response.json(
      { message: "Failed to create comment" },
      { status: 500 },
    );
  }
}
