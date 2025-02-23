import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const round1Router = createTRPCRouter({
  getQuestionsByCurrentLevel: protectedProcedure
    .input(
      z
        .number({ message: "Level must be in the range of 1 to 10 only" })
        .min(1)
        .max(10),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.question.findMany({
          where: {
            level: {
              gte: 1,
              lte: input,
            },
          },
        });
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while fetching questions",
          cause: error,
        });
      }
    }),

  getQuestionById: protectedProcedure
    .input(z.string({ message: "Question Id is required" }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findUnique({
        where: { id: input },
        select: {
          id: true,
          question: true,
          code: true,
          tags: true,
          maxPoints: true,
          level: true,
          options: {
            select: {
              id: true,
              option: true,
              code: true,
            },
          },
        },
      });
    }),

  getAllQuestions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.question.findMany({
      select: { id: true },
    });
  }),
});
