export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div>
          <p className="text-sm font-medium text-violet-400">Settings</p>

          <h1 className="mt-2 text-4xl font-bold">Edit your profile</h1>

          <p className="mt-3 text-gray-400">
            Update the information shown on your public developer profile.
          </p>
        </div>

        <form className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Name</label>

            <input
              type="text"
              defaultValue="Eva Sobh"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Username</label>

            <input
              type="text"
              defaultValue="evasobh"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Bio</label>

            <textarea
              rows={5}
              defaultValue="Full-stack developer interested in building clean, useful, and secure web applications."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Skills</label>

            <input
              type="text"
              defaultValue="Next.js, TypeScript, MongoDB, React"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />

            <p className="mt-2 text-xs text-gray-500">
              Separate skills with commas.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
c;
