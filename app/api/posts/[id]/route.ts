import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author.toString() !== user._id.toString()) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const { title, content, topics } = body;

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.topics = topics ?? post.topics;

    if (title) {
      post.slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    await post.save();

    return Response.json(
      {
        message: "Post updated successfully",
        post,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update post error:", error);

    return Response.json({ message: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return Response.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author.toString() !== user._id.toString()) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    await post.deleteOne();

    return Response.json(
      { message: "Post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete post error:", error);

    return Response.json({ message: "Failed to delete post" }, { status: 500 });
  }
}
