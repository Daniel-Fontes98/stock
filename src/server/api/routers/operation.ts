import { Item } from "@prisma/client";
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
  operationBox: publicProcedure
    .input(
      z.object({
        operationType: z.string(),
        quantity: z.number(),
        unitType: z.string(),
        reference: z.string().optional(),
        description: z.string().optional(),
        itemId: z.string(),
        deliveredTo: z.string().optional(),
        item: z.object({
          quantityInBox: z.number(),
          quantityUnit: z.number(),
          quantityBox: z.number(),
          alertMax: z.number(),
          alertMin: z.number(),
          Total: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      //Update Totals
      const operation =
        input.operationType === "Adicionar" ? "increment" : "decrement";

      const result: Item = await ctx.prisma.item.update({
        where: {
          id: input.itemId,
        },
        data: {
          quantityBox: { [operation]: input.quantity },
          Total: { [operation]: input.quantity * input.item.quantityInBox },
          operations: {
            //Create Operation
            create: {
              operationType: input.operationType,
              quantity: input.quantity,
              unitType: input.unitType,
              reference: input.reference,
              description: input.description,
              deliveredTo: input.deliveredTo,
            },
          },
        },
      });

      let alertType;
      if (result.Total < result.alertMax) {
        alertType = "Rutura";
      } else if (result.Total < result.alertMin) {
        alertType = "Minimo";
      } else {
        alertType = "Normal";
      }

      await ctx.prisma.alert.upsert({
        create: {
          type: alertType,
          itemId: result.id,
        },
        update: {
          type: alertType,
        },
        where: {
          itemId: result.id,
        },
      });
    }),
});
