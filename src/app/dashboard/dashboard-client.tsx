"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Copy, LogOut, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteMessage, markMessageAsRead } from "@/app/actions/messages";
import { formatDate } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: Date | string;
}

interface DashboardClientProps {
  initialMessages: Message[];
  username: string;
}

export function DashboardClient({
  initialMessages,
  username,
}: DashboardClientProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/u/${username}`;
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile link copied to clipboard!");
  };

  const handleDeleteMessage = async (messageId: string) => {
    setIsLoading(true);
    try {
      const result = await deleteMessage(messageId);

      if (result.success) {
        setMessages(messages.filter((msg) => msg.id !== messageId));
        toast.success("Message deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete message");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    setIsLoading(true);
    try {
      const result = await markMessageAsRead(messageId);

      if (result.success) {
        setMessages(
          messages.map((msg) =>
            msg.id === messageId ? { ...msg, isRead: true } : msg
          )
        );
        toast.success("Message marked as read");
      } else {
        toast.error(result.error || "Failed to mark message as read");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {unreadCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Link</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={copyProfileLink} size="sm" className="w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Messages</CardTitle>
          <CardDescription>
            Anonymous feedback messages you&apos;ve received
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No messages yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Share your profile link to start receiving feedback!
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="max-w-md">
                      <p className="truncate">{message.content}</p>
                    </TableCell>
                    <TableCell>{formatDate(message.createdAt)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          message.isRead
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }`}
                      >
                        {message.isRead ? "Read" : "Unread"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {!message.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsRead(message.id)}
                            disabled={isLoading}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMessage(message.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Logout Button */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
