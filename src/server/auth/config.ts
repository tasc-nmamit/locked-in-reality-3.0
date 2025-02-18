import { PrismaAdapter } from "@auth/prisma-adapter";
import { type Role } from "@prisma/client";
import type { User, DefaultSession, NextAuthConfig } from "next-auth";
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
      role: Role;
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            user.password ?? "",
          );

          if (isCorrectPassword) {
            return user as User;
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
    jwt({ token, account, user, trigger}) {
      
      if(trigger === "signIn" && account?.provider === "credentials"){
        if(user){
          interface LocalUser extends User {
            role: Role;
          }

          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.image = user.image;
          token.role = (user as LocalUser).role;
        }
      }

      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as Role
        },
      }
    }
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
    newUser: "/auth/signup",
  },
} satisfies NextAuthConfig;
