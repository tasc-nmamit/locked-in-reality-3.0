import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const settingsRouter = createTRPCRouter({
  getSettings: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.appSettings.findFirst();
  }),
  startRound1: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.appSettings.update({
      where: { id: 1 },
      data: {
        round1Start: new Date(),
      },
    });
  }),
});
