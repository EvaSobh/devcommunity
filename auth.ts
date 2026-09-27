import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],

  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();

      if (!user.email) {
        return false;
      }

      const existingUser = await User.findOne({
        email: user.email,
      });

      if (!existingUser) {
        await User.create({
          name: user.name || "Developer",
          email: user.email,
          image: user.image || "",
        });
      } else {
        existingUser.name = user.name || existingUser.name;
        existingUser.image = user.image || existingUser.image;

        await existingUser.save();
      }

      return true;
    },
  },
});
