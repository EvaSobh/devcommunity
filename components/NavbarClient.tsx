"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavbarClient({
  isSignedIn,
  username,
  name,
  image,
}: {
  isSignedIn: boolean;
  username: string;
  name: string;
  image: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  function closeMobileMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initials =
    name
      ?.split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "D";

  return (
    <nav className="border-b border-white/10 bg-[#0b0d12] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Dev<span className="text-violet-400">Community</span>
        </Link>

        {/* Desktop main navigation */}
        <div className="hidden items-center gap-8 text-sm text-gray-300 lg:flex">
          <Link href="/" className="transition hover:text-white">
            Explore
          </Link>

          <Link href="/communities" className="transition hover:text-white">
            Communities
          </Link>

          <Link href="/blogs" className="transition hover:text-white">
            Blogs
          </Link>

          <Link href="/bookmarks" className="transition hover:text-white">
            Bookmarks
          </Link>
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isSignedIn ? (
            <Link
              href="/signin"
              className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-violet-500/50 hover:text-white"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                href="/create"
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium transition hover:bg-violet-500"
              >
                + Create Post
              </Link>

              {/* Profile dropdown */}
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2 transition hover:border-violet-500/40 hover:bg-white/[0.05]"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-semibold text-violet-300">
                      {initials}
                    </div>
                  )}

                  <span className="max-w-28 truncate text-sm font-medium">
                    {name}
                  </span>

                  <span
                    className={`pr-1 text-xs text-gray-500 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#12151c] p-2 shadow-2xl">
                    <div className="border-b border-white/10 px-3 py-3">
                      <p className="truncate text-sm font-medium">{name}</p>

                      {username && (
                        <p className="mt-1 truncate text-xs text-gray-500">
                          @{username}
                        </p>
                      )}
                    </div>

                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        Dashboard
                      </Link>

                      {username && (
                        <Link
                          href={`/profile/${username}`}
                          onClick={() => setProfileOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
                        >
                          Profile
                        </Link>
                      )}

                      <Link
                        href="/settings"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-white/10 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          signOut({
                            callbackUrl: "/",
                          })
                        }
                        className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 lg:hidden"
        >
          <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 px-6 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
            >
              Explore
            </Link>

            <Link
              href="/communities"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
            >
              Communities
            </Link>

            <Link
              href="/blogs"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
            >
              Blogs
            </Link>

            <Link
              href="/bookmarks"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
            >
              Bookmarks
            </Link>

            <div className="my-3 border-t border-white/10" />

            {!isSignedIn ? (
              <Link
                href="/signin"
                onClick={closeMobileMenu}
                className="rounded-xl bg-violet-600 px-4 py-3 text-center font-medium"
              >
                Sign In
              </Link>
            ) : (
              <>
                <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15 text-sm font-semibold text-violet-300">
                      {initials}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium">{name}</p>

                    {username && (
                      <p className="text-xs text-gray-500">@{username}</p>
                    )}
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
                >
                  Dashboard
                </Link>

                {username && (
                  <Link
                    href={`/profile/${username}`}
                    onClick={closeMobileMenu}
                    className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
                  >
                    Profile
                  </Link>
                )}

                <Link
                  href="/settings"
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-gray-300 hover:bg-white/[0.04]"
                >
                  Settings
                </Link>

                <Link
                  href="/create"
                  onClick={closeMobileMenu}
                  className="mt-2 rounded-xl bg-violet-600 px-4 py-3 text-center font-medium"
                >
                  + Create Post
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="mt-2 rounded-xl border border-white/10 px-4 py-3 text-left text-red-400"
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
