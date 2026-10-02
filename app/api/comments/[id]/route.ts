import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { updateCommentSchema } from "@/lib/validation";

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

    const result = updateCommentSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          message: result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return Response.json({ message: "Comment not found" }, { status: 404 });
    }

    if (comment.author.toString() !== user._id.toString()) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    comment.content = result.data.content;

    await comment.save();

    return Response.json(
      {
        message: "Comment updated successfully",
        comment,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update comment error:", error);

    return Response.json(
      { message: "Failed to update comment" },
      { status: 500 },
    );
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

    const comment = await Comment.findById(id);

    if (!comment) {
      return Response.json({ message: "Comment not found" }, { status: 404 });
    }

    if (comment.author.toString() !== user._id.toString()) {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    await comment.deleteOne();

    return Response.json(
      { message: "Comment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete comment error:", error);

    return Response.json(
      { message: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
