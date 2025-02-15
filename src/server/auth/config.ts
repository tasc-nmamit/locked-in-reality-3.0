import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "~/lib/hashing";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "team_name@incridea.lir.in",
        },
        password: { label: "Password", type: "password" },
      },
      // id: "creds_1",

      async authorize(credentials) {
        const data = {
          email: credentials.email as string,
          password: (credentials.password ?? "") as string,
        };

        if (data.email && data.password) {
          const user = await db.user.findFirst({
            where: {
              email: data.email,
            },
          });

          if (user === null) return null;

          const isCorrectPassword = await comparePassword(
            data.password,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            user.password ?? "",
          );

          if (isCorrectPassword) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
    newUser: "/auth/signup",
  },
} satisfies NextAuthConfig;
