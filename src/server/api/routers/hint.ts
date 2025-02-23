import { Round1HintZ } from "~/zod/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const hintRouter = createTRPCRouter({
  useRound1Hint: protectedProcedure
    .input(Round1HintZ)
    .mutation(async ({ ctx, input }) => {
      const submission = await ctx.db.submission.findFirst({
        where: {
          questionId: input.questionId,
          userId: ctx.session.user.id,
        },
      });

      if (!submission) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Submission not found",
        });
      }

      if (submission.hintUsed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Hint already used",
        });
      }

      try {
        await ctx.db.submission.update({
          where: { id: submission.id },
          data: { hintUsed: true },
        });

        return {
          status: "success",
          message: "Hint used successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while fetching hint",
          cause: error,
        });
      }
    }),

  getRound1Hint: protectedProcedure
    .input(Round1HintZ)
    .query(async ({ ctx, input }) => {
      if (input.questionId === "") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Question ID is required",
        });
      }

      const submission = await ctx.db.submission.findFirst({
        where: {
          userId: ctx.session.user.id,
          questionId: input.questionId,
        },
      });

      if (submission === null || submission.hintUsed === false) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Hint not used",
        });
      }

      try {
        const hint = await ctx.db.question.findFirst({
          where: { id: input.questionId },
          select: {
            hint: true,
          },
        });

        return {
          status: "success",
          used: true,
          hint,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while fetching hint",
          cause: error,
        });
      }
    }),
});
