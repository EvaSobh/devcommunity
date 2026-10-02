import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { profileSchema } from "@/lib/validation";

export async function GET() {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({
      email: session.user.email,
    }).lean();

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get profile error:", error);

    return Response.json({ message: "Failed to get profile" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const result = profileSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          message: result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { name, username, bio, skills } = result.data;

    const usernameTaken = await User.findOne({
      username,
      email: { $ne: session.user.email },
    });

    if (usernameTaken) {
      return Response.json(
        { message: "Username is already taken" },
        { status: 409 },
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    user.name = name;
    user.username = username;
    user.bio = bio;
    user.skills = skills;

    await user.save();

    return Response.json(
      {
        message: "Profile updated successfully",
        user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update profile error:", error);

    return Response.json(
      { message: "Failed to update profile" },
      { status: 500 },
    );
  }
}
