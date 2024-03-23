import { createTRPCRouter } from "~/server/api/trpc";
import { alertRouter } from "./routers/alert";
import { itemRouter } from "./routers/item";
import { operationRouter } from "./routers/operation";
import { supplierRouter } from "./routers/supplier";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  items: itemRouter,
  operations: operationRouter,
  alerts: alertRouter,
  suppliers: supplierRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
