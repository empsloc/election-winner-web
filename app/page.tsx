"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push("/dashboard"); // Redirect logged-in user
      } else {
        router.push("/sign-in"); // Redirect logged-out user
      }
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Checking authentication...</p>
    </div>
  );
}
