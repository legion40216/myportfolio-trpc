"use client"
import React from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/links";
import { usePathname } from "next/navigation";
import NavLinks from "@/components/global-ui/nav-links";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function useNavRoutes() {
  const pathName = usePathname();

  return navLinks.map((link) => ({
    ...link,
    active: pathName?.startsWith(link.href + "/") || pathName === link.href,
  }));
}

export default function NavGroup() {
  const routes = useNavRoutes();

  return (
    <div className="flex items-center gap-3">
      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-3 items-center">
        {routes.map((route, index) => (
          <NavLinks
            key={index}
            routeActive={route.active}
            routeHref={route.href}
            routeLabel={route.label.charAt(0).toUpperCase() + route.label.slice(1)}
            className="hover:text-primary hover:underline"
            activeClassName="text-primary underline"
            inactiveClassName="text-muted-foreground"
          />
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 border rounded-md">
            <Menu className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[150px]">
            {routes.map((route, index) => (
              <DropdownMenuItem key={index} asChild>
                <NavLinks
                  routeActive={route.active}
                  routeHref={route.href}
                  routeLabel={route.label.charAt(0).toUpperCase() + route.label.slice(1)}
                  className="w-full"
                  activeClassName="text-primary underline"
                  inactiveClassName="text-muted-foreground"
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
