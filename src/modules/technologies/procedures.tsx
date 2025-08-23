import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prismadb";
import { technologiesSchema } from "@/schemas";

import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const technologiesRouter = createTRPCRouter({
    getAll: baseProcedure.query(async () => {
      try {
        const technologies = await prisma.technology.findMany({
          orderBy: { createdAt: "desc" },
        });

        return { technologies };
      } catch (error) {
        console.error("Error technologies [getAll]:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch technologies",
          cause: error,
        });
      }
    }),

  getById: baseProcedure
    .input(
      z.object({
        technologyId: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      try {
        const { technologyId } = input;

        const technology = await prisma.technology.findUnique({
          where: { id: technologyId },
        });

        if (!technology) {
          return { technology: null };
        }

        return { technology };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error technologys [getById]:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch technology",
          cause: error,
        });
      }
    }),

  create: protectedProcedure
    .input(technologiesSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.betterAuthUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      try {
        const technology = await prisma.technology.create({
          data: {
            ...input,
          },
        });

        return {
          success: true,
          message: "Technology created successfully",
          technology: technology,
        };
      } catch (error) {
        console.error("Error technology [create]:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A technology with this information already exists",
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create technology",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        ...technologiesSchema.shape,
      }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.betterAuthUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      try {
        await prisma.technology.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });

        return {
          success: true,
          message: "Technology updated successfully",
        };
      } catch (error) {
        console.error("Error technology [update]:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A technology with this information already exists",
            });
          }
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Technology not found",
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update technology",
          cause: error,
        });
      }
    }),

delete: protectedProcedure
  .input(
    z.object({
      itemId: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.betterAuthUserId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    try {
      await prisma.technology.delete({
        where: {
          id: input.itemId,
        },
      });

      return {
        success: true,
        message: "Technology deleted successfully",
      };
    } catch (error) {
      // Re-throw tRPC errors as-is
      if (error instanceof TRPCError) {
        throw error;
      }

      console.error("Error technology [delete]:", error);

      // Handle specific Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Technology not found or already deleted",
            cause: error,
          });
        }
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete technology",
        cause: error,
      });
    }
  }),

});