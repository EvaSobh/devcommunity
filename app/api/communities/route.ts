import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";

export async function GET() {
  try {
    await connectToDatabase();

    const communities = await Community.find().sort({
      createdAt: -1,
    });

    return Response.json({ communities }, { status: 200 });
  } catch (error) {
    console.error("Communities error:", error);

    return Response.json(
      { message: "Failed to get communities" },
      { status: 500 },
    );
  }
}
