"use server";

import { prisma } from "@/lib/prisma";
import { messageSchema } from "@/lib/validations/message";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function submitMessage(content: string, receiverUsername: string) {
  try {
    const validatedData = messageSchema.parse({ content });

    // Find the receiver by username
    const receiver = await prisma.user.findUnique({
      where: { username: receiverUsername },
    });

    if (!receiver) {
      throw new Error("User not found");
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content: validatedData.content,
        receiverId: receiver.id,
      },
    });

    return { success: true, message };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getUserMessages() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    const messages = await prisma.message.findMany({
      where: { receiverId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, messages };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function deleteMessage(messageId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    // Verify the message belongs to the user
    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
        receiverId: session.user.id,
      },
    });

    if (!message) {
      throw new Error("Message not found or unauthorized");
    }

    await prisma.message.delete({
      where: { id: messageId },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function markMessageAsRead(messageId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    // Verify the message belongs to the user
    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
        receiverId: session.user.id,
      },
    });

    if (!message) {
      throw new Error("Message not found or unauthorized");
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}
