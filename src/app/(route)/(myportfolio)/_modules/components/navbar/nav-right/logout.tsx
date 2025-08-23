"use client";
import React from "react";

import { useCurrentUser } from "@/hooks/client-auth-utils";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Logout() {
  const { user, isPending } = useCurrentUser();
  const isLoggedIn = !!user;

  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await authClient.signOut();
    router.refresh();
  };
  
  return (
    <>
      {isPending ? (
        <Button
          disabled={isPending}
        >
          <span className="animate-pulse">Loading...</span>
        </Button>
      ) : (
        <>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
          )}
        </>
      )}
    </>
  );
}
