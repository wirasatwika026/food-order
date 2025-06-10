"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LogoutPage() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
        router.push("/login"); // Redirect to login page after signing out
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    handleSignOut();
  }, [signOut, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Signing out...</p>
    </div>
  );
}
