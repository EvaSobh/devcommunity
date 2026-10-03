import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import NavbarClient from "@/components/NavbarClient";

export default async function Navbar() {
  const session = await auth();

  let username = "";
  let name = "";
  let image = "";

  if (session?.user?.email) {
    await connectToDatabase();

    const user = await User.findOne({
      email: session.user.email,
    }).lean();

    username = user?.username?.toLowerCase() || "";
    name = user?.name || session.user.name || "Developer";
    image = user?.image || session.user.image || "";
  }

  return (
    <NavbarClient
      isSignedIn={!!session?.user?.email}
      username={username}
      name={name}
      image={image}
    />
  );
}
