"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/validation";

export default function CredentialsSignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");

    const loginData = {
      email,
      password,
    };

    // Client-side Zod validation
    const result = loginSchema.safeParse(loginData);

    if (!result.success) {
      setMessage(
        result.error.issues[0]?.message ||
          "Please check your login information.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const signInResult = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setMessage("Invalid email or password.");
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Your password"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
        />
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
        {isSubmitting ? "Signing in..." : "Sign in with Email"}
      </button>
    </form>
  );
}
