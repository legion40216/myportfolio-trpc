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
        <span className="animate-pulse">Loading...</span>
      ) : (
        <>
          {isLoggedIn ? (
            <div 
              onClick={handleLogout}
              className="flex-1 cursor-pointer"
            >
              Logout
            </div>
          ) : (
            <Link href="/login" className="flex-1">Login</Link>
          )}
        </>
      )}
    </>
  );
}