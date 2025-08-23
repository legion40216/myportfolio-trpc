"use client"
import React, { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { useCurrentUser } from "@/hooks/client-auth-utils";
import { usePathname } from "next/navigation";
import { adminRoutes } from "@/data/links";

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
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {modifiedRoutes.map((route, index) => (
              <DropdownMenuItem key={index} className="p-0">
                <Link
                  href={route.href}
                  className={`block w-full px-3 py-2 
                    rounded-md text-sm 
                    transition-colors hover:bg-muted
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
