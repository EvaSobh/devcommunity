import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="border-b border-white/10 bg-[#0b0d12] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Dev<span className="text-violet-400">Community</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
          <Link href="/" className="hover:text-white">
            Explore
          </Link>

          <Link href="/communities" className="hover:text-white">
            Communities
          </Link>

          <Link href="/blogs" className="hover:text-white">
            Blogs
          </Link>

          <Link href="/bookmarks" className="hover:text-white">
            Bookmarks
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {!session ? (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Sign In
              </button>
            </form>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/profile/evasobh"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Profile
              </Link>

              <Link
                href="/create"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
              >
                + Create Post
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Sign Out
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
