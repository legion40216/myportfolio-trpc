"use client";
import React from "react";

import { useCurrentUser } from "@/hooks/client-auth-utils";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function LogoutGlobal() {
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
        <span className={isPending ? "cursor-not-allowed" : ""}>
          <span className="animate-pulse">Loading...</span>
        </span>
      ) : (
        <>
          {isLoggedIn ? (
            <span onClick={handleLogout}>
                Logout
            </span>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </>
      )}
    </>
  );
}
