import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Role } from "@prisma/client";
import type { User, DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
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
      role: Role;
      round1: number;
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
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  trustHost: true,
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
      id: "credentials",
      type: "credentials",

      async authorize(credentials) {
        const data = {
          email: credentials?.email,
          password: credentials?.password as string,
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
  secret: env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      // update token with user data
      if (trigger === "update" && token.sub) {
        const dbUser = await db.user.findFirst({
          where: { id: token.sub },
        });

        token = {
          ...token,
          picture: dbUser?.image,
          role: dbUser?.role,
          round1: dbUser?.round1,
        };
      } else if (user) {
        interface LocalUser extends User {
          role: Role;
          round1: number;
        }

        // populate token with user data when signin
        token = {
          ...token,
          name: user.name,
          email: user.email,
          picture: user.image,
          role: (user as LocalUser).role,
          round1: (user as LocalUser).round1,
        };
      }

      return token;
    },

    session: ({ token, session }) => {
      // augment session with user data
      if (session && session.user) {
        interface LocalToken {
          role: Role;
          round1: number;
        }

        session.user.id = token.sub ?? "";
        session.user.role = (token as unknown as LocalToken).role;
        session.user.round1 = (token as unknown as LocalToken).round1;
      }
      
      return {
        ...session,
        user: {
          ...session.user,
        }
      };
    },
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
    newUser: "/auth/signup",
  },
} satisfies NextAuthConfig;
