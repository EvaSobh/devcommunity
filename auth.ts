import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validation";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,

    Credentials({
      name: "Email and Password",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;

        await connectToDatabase();

        const user = await User.findOne({
          email,
        });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();

      if (!user.email) return false;
      const normalizedEmail = user.email.trim().toLowerCase();

      if (account?.provider === "credentials") {
        return true;
      }

      const existingUser = await User.findOne({
        email: normalizedEmail,
      });

      if (!existingUser) {
        await User.create({
          name: user.name || "Developer",
          email: normalizedEmail,
          image: user.image || "",
          provider: account?.provider || "credentials",
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
