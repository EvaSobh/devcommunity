import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectToDatabase();

  const user = await User.findOne({
    email: session.user.email,
  }).lean();

  if (!user) {
    redirect("/");
  }

  const safeUser = {
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    skills: user.skills || [],
  };

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div>
          <p className="text-sm font-medium text-violet-400">Account</p>

          <h1 className="mt-2 text-4xl font-bold">Settings</h1>

          <p className="mt-3 text-gray-400">
            Update your public developer profile.
          </p>
        </div>

        <SettingsForm user={safeUser} />
      </section>
    </main>
  );
}
