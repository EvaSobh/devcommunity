export default function CreatePostPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div>
          <p className="text-sm font-medium text-violet-400">
            Create Post
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Share something with the community
          </h1>

          <p className="mt-3 text-gray-400">
            Write a technical post and publish it to a developer community.
          </p>
        </div>

        <form className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Post title
            </label>

            <input
              type="text"
              placeholder="Enter your post title"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Community
            </label>

            <select className="w-full rounded-xl border border-white/10 bg-[#12151c] px-4 py-3 outline-none focus:border-violet-500">
              <option>Select community</option>
              <option>React</option>
              <option>Next.js</option>
              <option>TypeScript</option>
              <option>MongoDB</option>
              <option>Node.js</option>
              <option>JavaScript</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Topic
            </label>

            <input
              type="text"
              placeholder="Example: server-components"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Content
            </label>

            <textarea
              rows={12}
              placeholder="Write your post here..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-3 font-medium hover:bg-violet-500"
            >
              Publish Post
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}