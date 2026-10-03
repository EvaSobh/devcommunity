import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const session = await auth();

  let username = "";

  if (session?.user?.email) {
    await connectToDatabase();

    const user = await User.findOne({
      email: session.user.email,
    }).lean();

    username = user?.username?.toLowerCase() || "";
  }

  return (
    <NavbarClient isSignedIn={!!session?.user?.email} username={username} />
  );
}
