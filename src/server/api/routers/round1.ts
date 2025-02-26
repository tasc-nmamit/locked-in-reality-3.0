import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

export const round1Router = createTRPCRouter({
  getQuestionsByCurrentLevel: protectedProcedure
    .input(
      z.number({ message: "Level must be greater than or equal to 1" }).min(1),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.question.findMany({
          where: {
            level: {
              gte: 1,
              lte:
                input === 1
                  ? 1
                  : input + 1 >= env.TOTAL_ROUNDS
                    ? input
                    : input + 1,
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

  validateRound1Answer: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        submissions: {
          select: {
            id: true,
            status: true,
            points: true,
            hintUsed: true,
          },
        },
      },
    });

    const result = allUsers.map((user) => {
      const totalPoints = user.submissions.reduce((acc, submission) => {
        const currPoints =
          submission.status === "SUBMITTED" ? submission.points : 0;
        const afterHint =
          submission.status === "SUBMITTED" && submission.hintUsed ? -5 : 0;
        return acc + currPoints + afterHint;
      }, 0);

      return {
        ...user,
        totalPoints: totalPoints,
      };
    });

    return result.sort((a, b) => b.totalPoints - a.totalPoints);
  }),
});
