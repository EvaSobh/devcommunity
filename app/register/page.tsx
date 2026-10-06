"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { registerSchema } from "@/lib/validation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    const registerData = {
      name,
      email,
      password,
    };

    // Client-side Zod validation
    const result = registerSchema.safeParse(registerData);

    if (!result.success) {
      setMessage(
        result.error.issues[0]?.message || "Please check your information.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create account.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setMessage(
          "Account created, but automatic sign in failed. Please sign in.",
        );
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto flex max-w-md flex-col px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-medium text-violet-400">
            Join DevCommunity
          </p>

          <h1 className="mt-3 text-4xl font-bold">Create your account</h1>

          <p className="mt-3 text-gray-400">
            Start sharing, learning, and building with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* ERROR */}
          {message && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {message}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-violet-400 hover:text-violet-300"
          >
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
