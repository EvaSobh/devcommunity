"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavbarClient({
  isSignedIn,
  username,
}: {
  isSignedIn: boolean;
  username: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="border-b border-white/10 bg-[#0b0d12] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Dev<span className="text-violet-400">Community</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
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

        {/* Desktop account buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isSignedIn ? (
            <Link
              href="/signin"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>

              {username && (
                <Link
                  href={`/profile/${username}`}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Profile
                </Link>
              )}

              <Link
                href="/settings"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Settings
              </Link>

              <Link
                href="/create"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
              >
                + Create Post
              </Link>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="text-2xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 px-6 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04] hover:text-white"
            >
              Explore
            </Link>

            <Link
              href="/communities"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04] hover:text-white"
            >
              Communities
            </Link>

            <Link
              href="/blogs"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04] hover:text-white"
            >
              Blogs
            </Link>

            <Link
              href="/bookmarks"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04] hover:text-white"
            >
              Bookmarks
            </Link>

            <div className="my-2 border-t border-white/10" />

            {!isSignedIn ? (
              <Link
                href="/signin"
                onClick={closeMenu}
                className="rounded-lg bg-violet-600 px-4 py-3 text-center font-medium hover:bg-violet-500"
              >
                Sign In
              </Link>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
                >
                  Dashboard
                </Link>

                {username && (
                  <Link
                    href={`/profile/${username}`}
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
                  >
                    Profile
                  </Link>
                )}

                <Link
                  href="/settings"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
                >
                  Settings
                </Link>

                <Link
                  href="/create"
                  onClick={closeMenu}
                  className="mt-2 rounded-lg bg-violet-600 px-4 py-3 text-center font-medium hover:bg-violet-500"
                >
                  + Create Post
                </Link>

                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-lg border border-white/10 px-4 py-3 text-left text-gray-300"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
