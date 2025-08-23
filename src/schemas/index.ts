//schemas/index.ts
import * as z from "zod"

//Form schemas
export type LoginFormValues = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
    email: z.email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
})

export type RegisterFormValues = z.infer<typeof registerSchema>;
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imgSrc: z.string().min(1, "Image is required"),
  webLink: z.string().min(1, "Web link is required"),
  githubLink: z.string().min(1, "Github link is required"),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),

  technologies: z.array(z.object({
    technologyId: z.string(),
  })).default([]).optional(),
});

export type TechnologiesFormValues = z.infer<typeof technologiesSchema>;
export const technologiesSchema = z.object({
  title: z.string().min(1, "Title is required"),
});