import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { RegisterSchemaZ } from "~/zod/schema";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "~/lib/hashing";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(RegisterSchemaZ)
    .mutation(async ({ ctx, input }) => {
      // Check if all fields are filled
      if (input.email === "" || input.password === "" || input.name === "") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "All fields are required",
        });
      }

      // Check if email is already
      const isUsed = await ctx.db.user.findFirst({
        where: { email: input.email },
      });
      if (isUsed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is already in use",
        });
      }

      //   Register user
      try {
        const hashedPassword = await hashPassword(input.password);

        const user = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
          },
        });

        return {
          status: "success",
          message: "User Registered",
          user: user,
        };
      } catch (error) {
        console.log(error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to Register",
          cause: error,
        });
      }
    }),

  addTeam: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const teamName = input.trim().toLowerCase().replace(" ", "-");
      const teamEmail = teamName + "@incridea.lir.in";
      const hashedPassword = await hashPassword(teamName);

      const user = await ctx.db.user.create({
        data: {
          name: teamName,
          email: teamEmail,
          password: hashedPassword,
        },
      });

      return user;
    }),
});
