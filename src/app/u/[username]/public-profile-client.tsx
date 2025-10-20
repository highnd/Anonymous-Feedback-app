"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema, type MessageInput } from "@/lib/validations/message";
import { submitMessage } from "@/app/actions/messages";

interface PublicProfileClientProps {
  username: string;
}

export function PublicProfileClient({ username }: PublicProfileClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MessageInput>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: MessageInput) => {
    setIsLoading(true);
    try {
      const result = await submitMessage(data.content, username);

      if (result.success) {
        form.reset();
        toast.success("Message sent successfully!");
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Anonymous Feedback</CardTitle>
        <CardDescription>
          Your message will be sent anonymously. The recipient won&apos;t know
          who sent it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous feedback here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Anonymous Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
