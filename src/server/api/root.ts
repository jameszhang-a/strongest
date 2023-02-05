import { createTRPCRouter } from "./trpc";
import { lolRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  champs: lolRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
