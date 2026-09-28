import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";
import User from "@/models/User";

export async function POST(
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

    const community = await Community.findById(id);

    if (!community) {
      return Response.json({ message: "Community not found" }, { status: 404 });
    }

    const isMember = community.members.some(
      (memberId: { toString: () => string }) =>
        memberId.toString() === user._id.toString(),
    );

    if (isMember) {
      community.members = community.members.filter(
        (memberId: { toString: () => string }) =>
          memberId.toString() !== user._id.toString(),
      );

      user.joinedCommunities = user.joinedCommunities.filter(
        (communityId: { toString: () => string }) =>
          communityId.toString() !== community._id.toString(),
      );

      await community.save();
      await user.save();

      return Response.json({
        message: "Left community",
        joined: false,
      });
    }

    community.members.push(user._id);
    user.joinedCommunities.push(community._id);

    await community.save();
    await user.save();

    return Response.json(
      {
        message: "Joined community",
        joined: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Join community error:", error);

    return Response.json(
      { message: "Failed to update membership" },
      { status: 500 },
    );
  }
}
