import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import Post from "@/models/Post";
import User from "@/models/User";
import Community from "@/models/Community";
import Link from "next/link";

export default async function BookmarksPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectToDatabase();

  const user = await User.findOne({
    email: session.user.email,
  });

  if (!user) {
    redirect("/");
  }

  const bookmarks = await Bookmark.find({
    user: user._id,
  })
    .populate({
      path: "post",
      model: Post,
      populate: [
        {
          path: "author",
          model: User,
          select: "name username",
        },
        {
          path: "community",
          model: Community,
          select: "name slug",
        },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div>
          <p className="text-sm font-medium text-violet-400">Bookmarks</p>

          <h1 className="mt-2 text-4xl font-bold">Saved posts</h1>

          <p className="mt-3 text-gray-400">
            Posts you saved to read again later.
          </p>
        </div>

        {bookmarks.length > 0 ? (
          <div className="mt-10 space-y-4">
            {bookmarks.map((bookmark) => (
              <article
                key={bookmark._id.toString()}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">
                    {bookmark.post.community.name}
                  </span>

                  <span className="text-gray-500">
                    By {bookmark.post.author.name}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  {bookmark.post.title}
                </h2>

                <div className="mt-5 text-right">
                  <Link
                    href={`/blogs/${bookmark.post.slug}`}
                    className="text-sm font-medium text-violet-400 hover:text-violet-300"
                  >
                    Read post →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">No bookmarks yet</h2>

            <p className="mt-2 text-sm text-gray-400">
              Save a blog post and it will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
