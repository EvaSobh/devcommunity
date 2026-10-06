"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { profileSchema } from "@/lib/validation";

type UserData = {
  name: string;
  username?: string;
  bio?: string;
  skills?: string[];
};

export default function SettingsForm({ user }: { user: UserData }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [skills, setSkills] = useState((user.skills || []).join(", "));

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const profileData = {
      name,
      username,
      bio,
      skills: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    // CLIENT-SIDE ZOD VALIDATION
    const result = profileSchema.safeParse(profileData);

    if (!result.success) {
      setMessage(
        result.error.issues[0]?.message || "Please check your information.",
      );
      setMessageType("error");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update profile.");
        setMessageType("error");
        return;
      }

      setMessage("Profile updated successfully.");
      setMessageType("success");

      // Refresh server components such as navbar/profile data
      router.refresh();
    } catch {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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

      {/* USERNAME */}
      <div>
        <label className="mb-2 block text-sm text-gray-300">Username</label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
        />

        <p className="mt-2 text-xs text-gray-500">
          Use lowercase letters, numbers, and underscores only.
        </p>
      </div>

      {/* BIO */}
      <div>
        <label className="mb-2 block text-sm text-gray-300">Bio</label>

        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell other developers about yourself..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
        />

        <p className="mt-2 text-xs text-gray-500">Maximum 300 characters.</p>
      </div>

      {/* SKILLS */}
      <div>
        <label className="mb-2 block text-sm text-gray-300">Skills</label>

        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Next.js, TypeScript, MongoDB"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none transition focus:border-violet-500"
        />

        <p className="mt-2 text-xs text-gray-500">
          Separate skills with commas.
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            messageType === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {message}
        </div>
      )}

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
