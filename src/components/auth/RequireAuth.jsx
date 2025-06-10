"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function RequireAuth({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
      } else if (requireAdmin && user.user_metadata?.role !== "admin") {
        router.push("/");
      }
    }
  }, [loading, user, router, pathname, requireAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // If has proper permission, render children
  if (
    !loading &&
    user &&
    (!requireAdmin || user.user_metadata?.role === "admin")
  ) {
    return <>{children}</>;
  }

  // Otherwise don't render anything
  return null;
}
