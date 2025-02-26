import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const round2Router = createTRPCRouter({
  scanQRCode: protectedProcedure
    .input(z.string({ message: "QR Code is required" }))
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      console.log(team?.email);

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
        });
      }

      const qrCode = await ctx.db.qRCode.findUnique({
        where: { id: input },
        select: {
          id: true,
          teamId: true,
          order: true,
          location: {
            select: { id: true, name: true },
          },
        },
      });
      console.log(qrCode?.id, qrCode?.location.name);

      if (!qrCode) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "QR Code not found",
        });
      }

      if (!qrCode.teamId) {
        const existingProgress = await ctx.db.progress.findFirst({
          where: {
            teamId: team.id,
            qrCodeId: qrCode.id,
          },
        });

        if (existingProgress) {
          return {
            status: "SUCCESS",
            fake: true,
            message: "You have already scanned this QR code.",
          };
        }

        await ctx.db.progress.create({
          data: {
            team: { connect: { id: team?.id } },
            qrCode: { connect: { id: qrCode.id } },
            completed: true,
          },
        });

        return {
          status: "SUCCESS",
          fake: true,
          message: "QR Code to stall time",
        };
      }

      const progress = await ctx.db.progress.findMany({
        where: {
          teamId: team?.id,
          qrCode: {
            teamId: team?.id,
          },
          completed: true,
        },
        include: { qrCode: true },
        orderBy: { updatedAt: "desc" },
      });

      if (!progress[0]?.completed) {
        return {
          status: "ERROR",
          message: "You have not completed the previous puzzle",
        };
      }

      const lastScannedOrder = progress[0]?.qrCode.order ?? 0;

      if (qrCode.teamId !== team?.id) {
        if (qrCode.order === lastScannedOrder + 1) {
          await ctx.db.progress.create({
            data: {
              team: { connect: { id: team?.id } },
              qrCode: { connect: { id: qrCode.id } },
              completed: true,
            },
          });

          return {
            status: "SUCCESS",
            path: false,
            message:
              "This QR code belongs to another team, but it was scanned in the correct order.",
          };
        } else
          return {
            status: "ERROR",
            path: false,
            message:
              "This QR code belongs to another team and is out of order. Follow your own path!",
          };
      }

      const existingProgress = progress.findIndex(
        (p) => p.qrCodeId === qrCode.id,
      );

      if (existingProgress !== -1) {
        return {
          status: "SUCCESS",
          scanned: true,
          message: "You have already scanned this QR code.",
        };
      } else {
        if (qrCode.order === lastScannedOrder + 1) {
          await ctx.db.progress.create({
            data: {
              team: { connect: { id: team?.id } },
              qrCode: { connect: { id: qrCode.id } },
              completed: true,
            },
          });

          return {
            status: "SUCCESS",
            message: "QR Code scanned successfully",
          };
        } else {
          return {
            status: "ERROR",
            message: "QR Code out of order",
          };
        }
      }
    }),

  updateProgress: protectedProcedure
    .input(z.string({ message: "QR Code is required" }))
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!team) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Team not found",
        });
      }

      // Fetch the input QR code
      const qrCode = await ctx.db.qRCode.findUnique({
        where: { id: input },
        select: {
          id: true,
          teamId: true,
          hint: true,
          order: true,
          location: {
            select: { name: true },
          },
        },
      });

      if (!qrCode) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "QR Code not found",
        });
      }

      // Fetch the team's progress for this QR code
      const progress = await ctx.db.progress.findFirst({
        where: {
          teamId: team.id,
          qrCodeId: qrCode.id,
        },
      });

      if (!progress) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You have not scanned this QR code yet.",
        });
      }

      if (progress.completed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You have already completed this puzzle.",
        });
      }

      // Update the progress to mark the puzzle as completed
      await ctx.db.progress.update({
        where: { id: progress.id },
        data: { completed: true },
      });

      return {
        status: "SUCCESS",
        message: "Puzzle marked as completed.",
        hint: qrCode.hint,
        location: qrCode.location.name,
      };
    }),
});
