import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Community from "@/models/Community";
import CreatePostForm from "@/components/CreatePostForm";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  await connectToDatabase();

  const communities = await Community.find().lean();

  const safeCommunities = communities.map((community) => ({
    _id: community._id.toString(),
    name: community.name,
  }));

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div>
          <p className="text-sm font-medium text-violet-400">Create Post</p>

          <h1 className="mt-2 text-4xl font-bold">
            Share something with the community
          </h1>

          <p className="mt-3 text-gray-400">
            Write a technical post and publish it to a developer community.
          </p>
        </div>

        <CreatePostForm communities={safeCommunities} />
      </section>
    </main>
  );
}
