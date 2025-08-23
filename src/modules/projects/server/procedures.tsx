import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prismadb";
import { projectSchema } from "@/schemas";

import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const projectsRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          technologies: {
            include: {
              technology: true,
            },
          },
        },
      });

      return { projects };
    } catch (error) {
      console.error("Error projects [getAll]:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch project",
        cause: error,
      });
    }
  }),

  getById: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      try {
        const { projectId } = input;

        const project = await prisma.project.findUnique({
          where: { id: projectId },
          include: {
            technologies: {
              include: {
                technology: true,
              },
            },
          },
        });

        if (!project) {
          return { project: null };
        }

        return { project };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error projects [getById]:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch product",
          cause: error,
        });
      }
    }),

  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.betterAuthUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      try {
        const { technologies, ...projectData } = input;

        const project = await prisma.$transaction(async (tx) => {
          const newProject = await tx.project.create({
            data: {
              title: projectData.title,
              description: projectData.description,
              webLink: projectData.webLink,
              githubLink: projectData.githubLink,
              imgSrc: projectData.imgSrc,
              isFeatured: projectData.isFeatured,
              isArchived: projectData.isArchived,
            },
          });

          if (technologies && technologies.length > 0) {
            await tx.projectTechnology.createMany({
              data: technologies.map((item) => ({
                projectId: newProject.id,
                technologyId: item.technologyId,
              })),
            });
          }

          return newProject;
        });

        return {
          success: true,
          message: "Project created successfully",
          project: project,
        };
      } catch (error) {
        console.error("Error projects [create]:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A project with this information already exists",
            });
          }
          if (error.code === "P2003") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid technology",
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
          cause: error,
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        ...projectSchema.shape, // Use .shape to spread the schema fields
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
        const { technologies, ...projectData } = input;

        await prisma.$transaction(async (tx) => {
          // 1. Update project fields
          await tx.project.update({
            where: { id: input.id },
            data: {
              title: projectData.title,
              description: projectData.description,
              webLink: projectData.webLink,
              githubLink: projectData.githubLink,
              imgSrc: projectData.imgSrc,
              isFeatured: projectData.isFeatured,
              isArchived: projectData.isArchived,
            },
          });

          // 2. Reset technologies for this project
          if (technologies) {
            // remove old links
            await tx.projectTechnology.deleteMany({
              where: { projectId: input.id },
            });

            // insert new links
            await tx.projectTechnology.createMany({
              data: technologies.map((t) => ({
                projectId: input.id,
                technologyId: t.technologyId,
              })),
            });
          }
        });
        return {
          success: true,
          message: "Project updated successfully",
        };
      } catch (error) {
        console.error("Error projects [update]:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "A project with this information already exists",
            });
          }
          if (error.code === "P2003") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid technology",
            });
          }
          if (error.code === "P2025") {
            // ✅ Add handling for record not found
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Project not found",
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update project",
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
        await prisma.project.delete({
          where: {
            id: input.itemId,
          },
        });

        return {
          success: true,
          message: "Project deleted successfully",
        };
      } catch (error) {
        // Re-throw tRPC errors as-is
        if (error instanceof TRPCError) {
          throw error;
        }

        console.error("Error projects [delete]:", error);

        // Handle specific Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Project not found or already deleted",
              cause: error,
            });
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete project",
          cause: error,
        });
      }
    }),
});