import { signIn } from "@/auth";
import Link from "next/link";
import CredentialsSignInForm from "@/components/CredentialsSignInForm";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <section className="mx-auto flex max-w-md flex-col px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-medium text-violet-400">Welcome back</p>

          <h1 className="mt-3 text-4xl font-bold">Sign in to DevCommunity</h1>

          <p className="mt-3 text-gray-400">Choose how you want to continue.</p>
        </div>

        <div className="mt-10 space-y-4">
          <form
            action={async () => {
              "use server";

              await signIn("github", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-xl border border-white/10 px-5 py-3 font-medium hover:border-violet-500"
            >
              Continue with GitHub
            </button>
          </form>

          <form
            action={async () => {
              "use server";

              await signIn("google", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-xl border border-white/10 px-5 py-3 font-medium hover:border-violet-500"
            >
              Continue with Google
            </button>
          </form>

          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-sm text-gray-500">or</span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <CredentialsSignInForm />

          <p className="pt-3 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-violet-400 hover:text-violet-300"
            >
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
