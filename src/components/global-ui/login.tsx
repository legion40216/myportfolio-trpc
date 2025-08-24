"use client";
import { useCurrentUser } from "@/hooks/client-auth-utils";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function Login() {
    const { user } = useCurrentUser();
    const isLoggedIn = !!user;
  return (
    <>
      {!isLoggedIn && (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );
}
