import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.item.findMany();
  }),
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        alertMin: z.number(),
        quantityInBox: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const item = opts.ctx.prisma.item.create({ data: input });
      return item;
    }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query((opts) => {
      return opts.ctx.prisma.item.findFirst({
        where: {
          id: opts.input.id,
        },
      });
    }),
});
