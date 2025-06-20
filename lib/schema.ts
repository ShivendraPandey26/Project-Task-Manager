import { z } from "zod";

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
