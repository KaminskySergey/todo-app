import { Priority, Status } from "@prisma/client";
import * as z from "zod";

export const loginUserSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must be at most 16 characters long"),
});

export const registerUserSchema = z.object({
  firstName: z
    .string()
    .max(12, "First Name must be at most 12 characters long"),
  lastName: z.string().max(20, "Last Name must be at most 20 characters long"),
  email: z.email("Please enter a valid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password must be at most 16 characters long"),
});

export const todoFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    priority: z.enum(Priority),
    status: z.enum(Status),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const changeEmailSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be at most 16 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be at most 16 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be at most 16 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be at most 16 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserLoginSchema = z.infer<typeof loginUserSchema>;
export type UserRegisterSchema = z.infer<typeof registerUserSchema>;
export type EmailChangeSchema = z.infer<typeof changeEmailSchema>;
export type PasswordChangeSchema = z.infer<typeof changePasswordSchema>;
export type TodoFormType = z.infer<typeof todoFormSchema>;
