import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();

    return Response.json({
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MongoDB error:", error);

    return Response.json(
      {
        message: "MongoDB connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
