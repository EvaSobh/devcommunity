const blogData = {
  "understanding-server-components": {
    title: "Understanding Server Components in Next.js",
    author: "Sarah Ahmed",
    community: "Next.js",
    topic: "server-components",
    date: "Sep 20, 2026",
    readTime: "5 min read",
    content: [
      "Server Components let you render parts of your application on the server instead of sending all the logic to the browser.",
      "They are useful for fetching data, reading server-side resources, and keeping sensitive logic away from the client.",
      "You should still use Client Components when you need browser interaction, local state, or browser APIs.",
    ],
  },

  "mongodb-embed-vs-reference": {
    title: "MongoDB Relationships: Embed or Reference?",
    author: "Alex Martin",
    community: "MongoDB",
    topic: "data-modeling",
    date: "Sep 18, 2026",
    readTime: "8 min read",
    content: [
      "MongoDB lets you store related data in different ways.",
      "Embedding can be useful when related data is small and usually read together.",
      "Referencing can be better when data grows, changes independently, or is shared between different documents.",
    ],
  },

  "typescript-large-projects": {
    title: "Why TypeScript Makes Large Projects Safer",
    author: "Maya Chen",
    community: "TypeScript",
    topic: "types",
    date: "Sep 16, 2026",
    readTime: "6 min read",
    content: [
      "TypeScript adds static typing to JavaScript.",
      "It can catch many mistakes before the application runs.",
      "It also makes larger projects easier to understand and maintain.",
    ],
  },

  "react-hooks-guide": {
    title: "React Hooks You Should Understand",
    author: "Daniel Lee",
    community: "React",
    topic: "hooks",
    date: "Sep 14, 2026",
    readTime: "7 min read",
    content: [
      "React hooks let functional components use state and other React features.",
      "useState is commonly used for local component state.",
      "useEffect is useful for side effects such as data fetching or subscriptions.",
    ],
  },

  "building-rest-apis-nodejs": {
    title: "Building REST APIs with Node.js",
    author: "Omar Khalil",
    community: "Node.js",
    topic: "api",
    date: "Sep 12, 2026",
    readTime: "9 min read",
    content: [
      "REST APIs let clients communicate with a server through HTTP.",
      "Common methods include GET, POST, PATCH, and DELETE.",
      "A good API should also return meaningful HTTP status codes and useful error messages.",
    ],
  },

  "javascript-async-await": {
    title: "JavaScript Async/Await Explained Simply",
    author: "Nina George",
    community: "JavaScript",
    topic: "async",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    content: [
      "JavaScript uses promises for asynchronous operations.",
      "The async and await syntax makes promise-based code easier to read.",
      "Error handling can be done with try and catch.",
    ],
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogData[slug as keyof typeof blogData];

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#0b0d12] px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Blog not found</h1>
          <p className="mt-3 text-gray-400">
            The article you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <article className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
            {blog.community}
          </span>

          <span className="text-sm text-gray-500">
            #{blog.topic}
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
          {blog.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>By {blog.author}</span>
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>

        <div className="my-10 border-t border-white/10" />

        <div className="space-y-6 text-lg leading-8 text-gray-300">
          {blog.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}