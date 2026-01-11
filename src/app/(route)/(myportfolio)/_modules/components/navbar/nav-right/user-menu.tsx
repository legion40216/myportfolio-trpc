"use client"
import React, { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useCurrentUser } from "@/hooks/client-auth-utils";
import { usePathname, useRouter } from "next/navigation";
import { adminRoutes } from "@/data/links";
import { authClient } from "@/lib/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user, isPending } = useCurrentUser();
  const isLoggedIn = !!user;
  const router = useRouter();

  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();

  // ✅ useMemo so reference doesn't change on every render
  const allRoutes = useMemo(() => [...adminRoutes], []);
  
  // Example: filter only specific routes
  const modifiedRoutes = useMemo(
    () => allRoutes.filter((route) => route.href === "/admin/dashboard"),
    [allRoutes]
  );

  useEffect(() => {
    const matchedRoute = allRoutes.find((route) => {
      if (pathname === route.href) return true;
      return pathname?.startsWith(route.href + "/");
    });
    setActiveLink(matchedRoute?.href || null);
  }, [pathname, allRoutes]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      {isPending ? (
        <Button variant="outline" size="icon" disabled>
          <span className="animate-pulse">...</span>
        </Button>
      ) : isLoggedIn ? (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="!p-5" variant="ghost" size="icon">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="z-[9999]" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            {modifiedRoutes.map((route, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={route.href}
                  className={`
                    ${
                      activeLink === route.href
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}