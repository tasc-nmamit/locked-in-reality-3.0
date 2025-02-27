import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export type ScanResponse = {
    status: "SUCCESS" | "ERROR";
    message: string;
    path: boolean;
    fake: boolean;
    hint?: string;
    code?: number;
    scanned: boolean;
}

const createScanResponse = (response: Partial<ScanResponse>): ScanResponse => {
    return {
        status: response.status ?? "ERROR", // Required field (defaulting to "ERROR" if not provided)
        message: response.message ?? "",
        path: response.path ?? true,
        fake: response.fake ?? false,
        hint: response.hint ?? "",
        code: response.code ?? 0,
        scanned: response.scanned ?? false,
    };
};

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
                    hint: true,
                    code: true,
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
                    return createScanResponse({
                        status: "SUCCESS",
                        fake: true,
                        message: "You have already scanned this QR code.",
                    });
                }

                await ctx.db.progress.create({
                    data: {
                        team: { connect: { id: team?.id } },
                        qrCode: { connect: { id: qrCode.id } },
                        completed: true,
                    },
                });

                return createScanResponse({
                    status: "SUCCESS",
                    fake: true,
                    message: "QR Code to stall time",
                });
            }

            const progress = await ctx.db.progress.findMany({
                where: {
                    teamId: team?.id,
                    qrCode: {
                        teamId: team?.id,
                    },
                },
                include: { qrCode: true },
                orderBy: { updatedAt: "desc" },
            });

            if (progress.length > 0 && !(progress[0]?.qrCodeId === qrCode.id) && !progress[0]?.completed) {
                return createScanResponse({
                    status: "ERROR",
                    message: "You have not completed the previous puzzle",
                });
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

                    return createScanResponse({
                        status: "SUCCESS",
                        path: false,
                        message: "This QR code belongs to another team, but it was scanned in the correct order.",
                    });
                } else
                    return createScanResponse({
                        status: "ERROR",
                        path: false,
                        message: "This QR code belongs to another team and is out of order. Follow your own path!",
                    });
            }

            const existingProgress = progress.findIndex(
                (p) => p.qrCodeId === qrCode.id,
            );

            if (existingProgress !== -1) {
                if (progress[existingProgress]?.completed)
                    return createScanResponse({
                        status: "SUCCESS",
                        scanned: true,
                        hint: qrCode.hint ?? "",
                        code: qrCode.code ?? 0,
                        message: "You have already scanned this QR code and completed the puzzle.",
                    });
                else {
                    return createScanResponse({
                        status: "SUCCESS",
                        message: "You have already scanned this QR code, but have not completed the puzzle",
                    });
                }
            } else {
                if (qrCode.order === lastScannedOrder + 1) {
                    await ctx.db.progress.create({
                        data: {
                            team: { connect: { id: team?.id } },
                            qrCode: { connect: { id: qrCode.id } },
                        },
                    });

                    return createScanResponse({
                        status: "SUCCESS",
                        message: "QR Code scanned successfully",
                    });
                } else {
                    return createScanResponse({
                        status: "ERROR",
                        message: "QR Code out of order",
                    });
                }
            }
        }),

    takeHint: protectedProcedure
        .input(z.string({ message: "QR Code is required" }))
        .mutation(async ({ ctx, input }) => {
            const team = await ctx.db.user.findUnique({
                where: { id: ctx.session.user.id }
            })

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

            await ctx.db.progress.update({
                where: { id: progress.id },
                data: { hintTaken: true }
            })

            return {
                status: "SUCCESS",
                message: "Hint taken successfully",
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

            const qrCode = await ctx.db.qRCode.findUnique({
                where: { id: input },
                select: {
                    id: true,
                    teamId: true,
                    hint: true,
                    code: true,
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

            await ctx.db.progress.update({
                where: { id: progress.id },
                data: { completed: true },
            });

            return {
                status: "SUCCESS",
                message: "Puzzle marked as completed.",
                hint: qrCode.hint,
                code: qrCode.code,
                location: qrCode.location.name,
            };
        }),
});
