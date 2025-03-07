import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import * as Routers from "~/server/api/routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: Routers.authRouter,
  settings: Routers.settingsRouter,
  round1: Routers.round1Router,
  round2: Routers.round2Router,
  hint: Routers.hintRouter,
  submission: Routers.submissionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
