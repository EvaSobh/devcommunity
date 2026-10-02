import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),

  email: z.string().trim().toLowerCase().email("Please enter a valid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email"),

  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),

  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  bio: z.string().trim().max(300, "Bio must be 300 characters or less"),

  skills: z
    .array(z.string().trim().min(1))
    .max(15, "You can add up to 15 skills"),
});

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be 120 characters or less"),

  content: z
    .string()
    .trim()
    .min(10, "Post content must be at least 10 characters"),

  communityId: z.string().min(1, "Please choose a community"),

  topics: z
    .array(z.string().trim().min(1))
    .max(10, "You can add up to 10 topics"),
});

export const commentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),

  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be 1000 characters or less"),
});

export const updateCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must be 1000 characters or less"),
});

export const bookmarkSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});
