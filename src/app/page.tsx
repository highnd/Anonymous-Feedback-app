"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Lightning from "@/components/Lightning";

export default function Home() {
  return (
    <div className="min-h-screen bg-black w-full relative">
      <div className="w-full h-full absolute top-0 left-0 opacity-50">
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div>
      <div className="w-full h-full absolute top-0 right-0 opacity-20 ">
        <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white">
              Anonymous Feedback
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create your profile and receive anonymous feedback from others.
              Share your unique link and let people send you honest, anonymous
              messages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-100"
            >
              <Link href="/register">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Create Profile
              </h3>
              <p className="text-gray-300 text-sm">
                Sign up and get your unique profile link
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-2xl">📤</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Share Link</h3>
              <p className="text-gray-300 text-sm">
                Share your link to receive anonymous feedback
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Get Feedback</h3>
              <p className="text-gray-300 text-sm">
                View all your anonymous messages in your dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
