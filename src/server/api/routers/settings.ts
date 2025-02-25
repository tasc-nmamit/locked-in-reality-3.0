import { createTRPCRouter, publicProcedure } from "../trpc";

export const settingsRouter = createTRPCRouter({
  getSettings: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.appSettings.findFirst();
  }),
});
