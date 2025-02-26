import { CreateSubmissionZ, UpdateSubmissionZ } from "~/zod/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";

export const submissionRouter = createTRPCRouter({
  createSubmission: protectedProcedure
    .input(CreateSubmissionZ)
    .mutation(async ({ ctx, input }) => {
      const dbData = await ctx.db.submission.findFirst({
        where: {
          userId: ctx.session.user.id,
          questionId: input.questionId,
        },
      });

      if (dbData) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Submission already exists",
        });
      }

      try {
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            submissions: {
              create: {
                questionId: input.questionId,
              },
            },
            round1:
              ctx.session.user.round1 + 1 <= env.TOTAL_ROUNDS
                ? ctx.session.user.round1 + 1
                : env.TOTAL_ROUNDS,
          },
        });

        return {
          status: "success",
          message: "Submission created successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while creating submission",
          cause: error,
        });
      }
    }),

  updateSubmission: protectedProcedure
    .input(UpdateSubmissionZ)
    .mutation(async ({ ctx, input }) => {
      const previousSubmission = await ctx.db.submission.findFirst({
        where: {
          userId: ctx.session.user.id,
          questionId: input.questionId,
        },
      });

      if (!previousSubmission || previousSubmission.selectedOptionId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Answer already submitted",
        });
      }

      const answer = await ctx.db.options.findFirst({
        where: { questionId: input.questionId },
        select: {
          id: true,
          isCorrect: true,
          question: {
            select: {
              maxPoints: true,
            },
          },
        },
      });

      if (!answer) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not find answers",
        });
      }

      try {
        await ctx.db.$transaction(async (tx) => {
          await tx.submission.update({
            where: { id: previousSubmission.id },
            data: {
              selectedOptionId: input.selectedOptionId,
              points: answer.isCorrect ? answer.question.maxPoints : 0,
              status: "SUBMITTED",
            },
          });

          // await tx.user.update({
          //   where: { id: ctx.session.user.id },
          //   data: {
          //     round1:
          //       ctx.session.user.round1 + 1 <= env.TOTAL_ROUNDS
          //         ? ctx.session.user.round1 + 1
          //         : 1,
          //   },
          // });
        });

        return {
          status: "success",
          message: "Submission updated successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while updating submission",
          cause: error,
        });
      }
    }),

  checkSubmission: protectedProcedure
    .input(z.string({ message: "Question Id is required" }))
    .query(async ({ ctx, input }) => {
      let submission = await ctx.db.submission.findFirst({
        where: {
          userId: ctx.session.user.id,
          questionId: input,
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (
        submission?.createdAt &&
        Date.now() - new Date(submission.createdAt).getTime() > 3 * 60 * 1000 &&
        submission.status === "PENDING"
      ) {
        submission = await ctx.db.submission.update({
          where: {
            id: submission.id,
          },
          data: {
            status: "SKIPPED",
          },
        });
      }

      return submission;
    }),

  getSubmissions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.submission.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: "asc",
      },
      select: {
        status: true,
        id: true,
        questionId: true,
        userId: true,
      },
    });
  }),
});
