import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const operationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.operation.findMany({
      include: {
        item: true,
      },
    });
  }),
  insertOne: publicProcedure
    .input(
      z.object({
        operationType: z.string(),
        quantity: z.number(),
        unitType: z.string(),
        reference: z.string().optional(),
        description: z.string().optional(),
        itemId: z.string(),
        deliveredTo: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      let item;
      const itemToUpdate = await opts.ctx.prisma.item.findFirst({
        where: {
          id: input.itemId,
        },
      });
      if (input.unitType === "CX") {
        if (input.operationType === "Adicionar") {
          item = await opts.ctx.prisma.item.update({
            where: {
              id: input.itemId,
            },
            data: {
              quantityBox: { increment: input.quantity },
              Total: {
                increment: input.quantity * itemToUpdate!.quantityInBox,
              },
            },
          });
          if (item.Total > item.alertMin) {
            await opts.ctx.prisma.alert.delete({
              where: {
                itemId: item.id,
              },
            });
          }
        } else if (input.operationType === "Remover") {
          item = await opts.ctx.prisma.item.update({
            where: {
              id: input.itemId,
            },
            data: {
              quantityBox: { decrement: input.quantity },
              Total: {
                decrement: input.quantity * itemToUpdate!.quantityInBox,
              },
            },
          });
        }
      } else if (input.unitType === "UN") {
        if (input.operationType === "Adicionar") {
          item = await opts.ctx.prisma.item.update({
            where: {
              id: input.itemId,
            },
            data: {
              quantityUnit: { increment: input.quantity },
              Total: {
                increment: input.quantity,
              },
            },
          });
          if (item.Total > item.alertMin) {
            await opts.ctx.prisma.alert.delete({
              where: {
                itemId: item.id,
              },
            });
          }
        } else if (input.operationType === "Remover") {
          item = await opts.ctx.prisma.item.update({
            where: {
              id: input.itemId,
            },
            data: {
              quantityUnit: { decrement: input.quantity },
              Total: {
                decrement: input.quantity,
              },
            },
          });
        }
      }
      if (item) {
        if (item.Total < item.alertMin) {
          const alert = await opts.ctx.prisma.alert.findFirst({
            where: {
              itemId: item.id,
            },
          });
          if (!alert) {
            await opts.ctx.prisma.alert.create({
              data: {
                itemId: item.id,
              },
            });
          }
        }
        const operation = await opts.ctx.prisma.operation.create({
          data: input,
        });
        return operation;
      }
    }),
});
