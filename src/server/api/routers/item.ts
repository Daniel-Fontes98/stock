import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.item.findMany({
      include: {
        supplier: true,
      },
    });
  }),

  insertOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        alertMin: z.number(),
        alertMax: z.number(),
        quantityInBox: z.number(),
        supplierId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const item = await opts.ctx.prisma.item.create({ data: input });
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

  updateBoxes: publicProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.number(),
        operationType: z.string(),
        reference: z.string().optional(),
        deliveredTo: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const itemToUpdate = await ctx.prisma.item.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!itemToUpdate) return null;

      if (input.operationType === "Adicionar") {
        const item = await ctx.prisma.item.update({
          where: {
            id: input.id,
          },
          data: {
            quantityBox: { increment: input.value },
            Total: { increment: input.value * itemToUpdate.quantityInBox },
            operations: {
              create: {
                operationType: input.operationType,
                quantity: input.value,
                unitType: "Box",
                reference: input.reference,
                deliveredTo: input.deliveredTo,
                description: input.description,
              },
            },
          },
        });

        let alertType;
        if (item.Total < item.alertMax) {
          alertType = "Rutura";
        } else if (item.Total < item.alertMin) {
          alertType = "Minimo";
        } else {
          alertType = "Normal";
        }

        await ctx.prisma.alert.upsert({
          create: {
            type: alertType,
            itemId: item.id,
          },
          update: {
            type: alertType,
          },
          where: {
            itemId: item.id,
          },
        });
      } else if (input.operationType === "Remover") {
        const item = await ctx.prisma.item.update({
          where: {
            id: input.id,
          },
          data: {
            quantityBox: { decrement: input.value },
            Total: { decrement: input.value * itemToUpdate.quantityInBox },
            operations: {
              create: {
                operationType: input.operationType,
                quantity: input.value,
                unitType: "Box",
                reference: input.reference,
                deliveredTo: input.deliveredTo,
                description: input.description,
              },
            },
          },
        });

        let alertType;
        if (item.Total < item.alertMax) {
          alertType = "Rutura";
        } else if (item.Total < item.alertMin) {
          alertType = "Minimo";
        } else {
          alertType = "Normal";
        }

        await ctx.prisma.alert.upsert({
          create: {
            type: alertType,
            itemId: item.id,
          },
          update: {
            type: alertType,
          },
          where: {
            itemId: item.id,
          },
        });
      } else {
        return null;
      }
    }),

  updateUnits: publicProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.number(),
        operationType: z.string(),
        quantityBox: z.number(),
        quantityInBox: z.number(),
        quantityUnit: z.number(),
        reference: z.string().optional(),
        deliveredTo: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.operationType === "Adicionar") {
        const item = await ctx.prisma.item.update({
          where: {
            id: input.id,
          },
          data: {
            quantityUnit:
              (input.quantityUnit + input.value) % input.quantityInBox,
            quantityBox: {
              increment: Math.floor(
                (input.quantityUnit + input.value) / input.quantityInBox
              ),
            },
            Total: { increment: input.value },
            operations: {
              create: {
                operationType: input.operationType,
                quantity: input.value,
                unitType: "Unit",
                reference: input.reference,
                deliveredTo: input.deliveredTo,
                description: input.description,
              },
            },
          },
        });
        let alertType;
        if (item.Total < item.alertMax) {
          alertType = "Rutura";
        } else if (item.Total < item.alertMin) {
          alertType = "Minimo";
        } else {
          alertType = "Normal";
        }

        await ctx.prisma.alert.upsert({
          create: {
            type: alertType,
            itemId: item.id,
          },
          update: {
            type: alertType,
          },
          where: {
            itemId: item.id,
          },
        });
        return item;
      }

      if (input.operationType === "Remover") {
        const item = await ctx.prisma.item.update({
          where: {
            id: input.id,
          },
          data: {
            quantityUnit:
              (input.quantityUnit +
                input.quantityInBox -
                (input.value % input.quantityInBox)) %
              input.quantityInBox,
            quantityBox: {
              increment: Math.floor(
                (input.quantityUnit - input.value) / input.quantityInBox
              ),
            },
            Total: { decrement: input.value },
            operations: {
              create: {
                operationType: input.operationType,
                quantity: input.value,
                unitType: "Unit",
                reference: input.reference,
                deliveredTo: input.deliveredTo,
                description: input.description,
              },
            },
          },
        });
        let alertType;
        if (item.Total < item.alertMax) {
          alertType = "Rutura";
        } else if (item.Total < item.alertMin) {
          alertType = "Minimo";
        } else {
          alertType = "Normal";
        }

        await ctx.prisma.alert.upsert({
          create: {
            type: alertType,
            itemId: item.id,
          },
          update: {
            type: alertType,
          },
          where: {
            itemId: item.id,
          },
        });
        return item;
      }
      return null;
    }),
});
