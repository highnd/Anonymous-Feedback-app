import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message must be less than 1000 characters"),
});

export type MessageInput = z.infer<typeof messageSchema>;
