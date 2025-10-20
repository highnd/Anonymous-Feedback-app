import { notFound } from "next/navigation";
import { getUserByUsername } from "@/app/actions/user";
import { PublicProfileClient } from "./public-profile-client";

interface PublicProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { username } = await params;

  const userResult = await getUserByUsername(username);

  if (!userResult.success || !userResult.user) {
    notFound();
  }

  const { user } = userResult;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Send anonymous feedback to {user.name}
            </p>
          </div>

          <PublicProfileClient username={username} />
        </div>
      </div>
    </div>
  );
}
