import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import Post from "@/models/Post";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const bookmarks = await Bookmark.find({
      user: user._id,
    })
      .populate({
        path: "post",
        model: Post,
      })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ bookmarks }, { status: 200 });
  } catch (error) {
    console.error("Get bookmarks error:", error);

    return Response.json(
      { message: "Failed to get bookmarks" },
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

    const { postId } = await request.json();

    if (!postId) {
      return Response.json({ message: "Post ID is required" }, { status: 400 });
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const existingBookmark = await Bookmark.findOne({
      user: user._id,
      post: postId,
    });

    if (existingBookmark) {
      await existingBookmark.deleteOne();

      return Response.json(
        {
          message: "Bookmark removed",
          bookmarked: false,
        },
        { status: 200 },
      );
    }

    await Bookmark.create({
      user: user._id,
      post: postId,
    });

    return Response.json(
      {
        message: "Post bookmarked",
        bookmarked: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Bookmark error:", error);

    return Response.json(
      { message: "Failed to update bookmark" },
      { status: 500 },
    );
  }
}
