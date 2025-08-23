"use client"
import React from 'react'

import { usePathname } from "next/navigation";
import NavLinks from '../components/nav-links';
import { adminRoutes } from '@/data/links';

export function useNavRoutes() {
  const pathName = usePathname();

  const filteredRoutes = [
    ...adminRoutes
  ];

  return filteredRoutes.map((link) => ({
    ...link,
    active: pathName?.startsWith(link.href + "/") || pathName === link.href,
  }));
}

import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from '@/hooks/client-auth-utils';

export default function NavGroup() {
  const { user, isPending } = useCurrentUser();
  const routes = useNavRoutes(); 
  
  if (!user) return null;
    
  return (
    <div className='flex gap-3 items-center'>
      {isPending && <Badge variant="secondary">Loading...</Badge>}
      
      {routes.map((route, index) => (
        <NavLinks 
          key={index}
          routeActive={route.active}
          routeHref={route.href}
          className="hover:no-underline"
        >
          <Badge
            variant={route.active ? "default" : "secondary"}
            className="cursor-pointer"
          >
            {route.label}
          </Badge>
        </NavLinks>
      ))}
    </div>
  );
}