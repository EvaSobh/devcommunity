import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { notFound, redirect } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  const { id } = await params;

  await connectToDatabase();

  const user = await User.findOne({
    email: session.user.email,
  });

  if (!user) {
    redirect("/");
  }

  const post = await Post.findById(id).lean();

  if (!post) {
    notFound();
  }

  if (post.author.toString() !== user._id.toString()) {
    redirect("/");
  }

  const safePost = {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    topics: post.topics,
    slug: post.slug,
  };

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div>
          <p className="text-sm font-medium text-violet-400">Edit Post</p>

          <h1 className="mt-2 text-4xl font-bold">Update your post</h1>
        </div>

        <EditPostForm post={safePost} />
      </section>
    </main>
  );
}
