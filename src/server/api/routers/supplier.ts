import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const supplierRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.supplier.findMany();
  }),
  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        contact: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const item = opts.ctx.prisma.supplier.create({ data: input });
      return item;
    }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query((opts) => {
      return opts.ctx.prisma.supplier.findFirst({
        where: {
          id: opts.input.id,
        },
      });
    }),
});
