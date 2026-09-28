"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinCommunityButton({
  communityId,
  initialJoined,
}: {
  communityId: string;
  initialJoined: boolean;
}) {
  const [joined, setJoined] = useState(initialJoined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleJoin() {
    setLoading(true);

    try {
      const response = await fetch(`/api/communities/${communityId}/join`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update membership");
        return;
      }

      setJoined(data.joined);
      router.refresh();
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500 disabled:opacity-50"
    >
      {loading
        ? "Please wait..."
        : joined
          ? "Leave Community"
          : "Join Community"}
    </button>
  );
}
