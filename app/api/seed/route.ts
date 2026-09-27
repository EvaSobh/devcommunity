import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";

const communities = [
  {
    name: "React",
    slug: "react",
    description:
      "Discuss components, hooks, state management, performance, and modern React development.",
    category: "Frontend",
    topics: ["hooks", "state", "components"],
  },
  {
    name: "Next.js",
    slug: "nextjs",
    description:
      "Explore App Router, Server Components, APIs, rendering, authentication, and deployment.",
    category: "Full Stack",
    topics: ["app-router", "server-components", "vercel"],
  },
  {
    name: "TypeScript",
    slug: "typescript",
    description:
      "Learn safer JavaScript, better typing patterns, reusable types, and scalable project structure.",
    category: "Language",
    topics: ["types", "interfaces", "generics"],
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    description:
      "Talk about schemas, queries, indexing, Atlas, Mongoose, and data modeling.",
    category: "Database",
    topics: ["mongoose", "atlas", "indexes"],
  },
  {
    name: "JavaScript",
    slug: "javascript",
    description:
      "Share knowledge about JavaScript fundamentals, ES features, async code, and browser development.",
    category: "Language",
    topics: ["javascript", "async", "web"],
  },
  {
    name: "Node.js",
    slug: "nodejs",
    description:
      "Discuss backend architecture, APIs, packages, authentication, and server-side JavaScript.",
    category: "Backend",
    topics: ["api", "backend", "node"],
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    await Community.deleteMany({});
    await Community.insertMany(communities);

    return Response.json({
      message: "Communities added successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to seed communities" },
      { status: 500 },
    );
  }
}
