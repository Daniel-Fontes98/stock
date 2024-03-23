import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const alertRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.alert.findMany({
      where: {
        NOT: {
          type: "Normal",
        },
      },
      include: {
        item: true,
      },
    });
  }),
  insertOne: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
        type: z.string(),
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
        itemId: z.string(),
      })
    )
    .query((opts) => {
      return opts.ctx.prisma.alert.findFirst({
        where: {
          itemId: opts.input.itemId,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      await opts.ctx.prisma.alert.delete({
        where: {
          itemId: input.itemId,
        },
      });
    }),
  aggravate: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.alert.update({
        where: {
          itemId: input.itemId,
        },
        data: {
          type: "Rutura",
        },
      });
    }),
  appease: publicProcedure
    .input(
      z.object({
        itemId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.alert.update({
        where: {
          itemId: input.itemId,
        },
        data: {
          type: "Minimo",
        },
      });
    }),
});
