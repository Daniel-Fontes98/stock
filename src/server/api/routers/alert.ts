import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const alertRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.alert.findMany({
      include: {
        item: true,
      },
    });
  }),
  insertOne: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const alert = opts.ctx.prisma.alert.create({ data: input });
      return alert;
    }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query((opts) => {
      return opts.ctx.prisma.alert.findFirst({
        where: {
          id: opts.input.id,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await opts.ctx.prisma.alert.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
