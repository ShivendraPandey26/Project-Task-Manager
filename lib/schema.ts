import { z } from "zod";

// This schema is used to validate user data in the application
// It ensures that the user data meets the required criteria before processing
// If the data does not meet the criteria, an error will be thrown with the specified message
export const userSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be less than 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .max(120, "Email must be less than 120 characters")
        .email("Invalid email address"),
    about: z
        .string().optional(),
    image: z
        .string().optional(),
    country: z.string().min(1, "Country is required"),
    industryType: z.string().min(1, "Industry Type is required"),
    role: z.string().min(1, "Role is required")
});

// This schema is used to validate workspace data in the application
export const workspaceSchema = z.object({
    name: z
        .string()
        .min(1, "Workspace name is required")
        .max(100, "Workspace name must be less than 100 characters"),
    description: z
        .string().optional()
});

export const projectSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Workspace name must be atleast 3 characters" }),
    workspaceId: z.string(),
    description: z.string().optional(),
    memberAccess: z.array(z.string()).optional(),
})
