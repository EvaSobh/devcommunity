import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { commentSchema } from "@/lib/validation";
import Post from "@/models/Post";

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return Response.json({ message: "Post ID is required" }, { status: 400 });
    }

    const session = await auth();

    let currentUser = null;

    if (session?.user?.email) {
      currentUser = await User.findOne({
        email: session.user.email,
      }).lean();
    }

    const comments = await Comment.find({
      post: postId,
    })
      .populate({
        path: "author",
        select: "name username image",
        model: User,
      })
      .sort({ createdAt: -1 })
      .lean();

    const safeComments = comments
      .map((comment) => ({
        _id: comment._id.toString(),
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,

        author: {
          name: comment.author?.name || "Developer",
          username: comment.author?.username || "",
          image: comment.author?.image || "",
        },

        isOwner:
          !!currentUser &&
          comment.author?._id?.toString() === currentUser._id.toString(),
      }))
      .sort((a, b) => {
        if (a.isOwner && !b.isOwner) return -1;
        if (!a.isOwner && b.isOwner) return 1;

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

    return Response.json({ comments: safeComments }, { status: 200 });
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

    const result = commentSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          message: result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { postId, content } = result.data;

    const post = await Post.findById(postId);

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const comment = await Comment.create({
      content,
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
