import React from "react";

import { footerLinks } from "@/data/links";

import NavLinks from "./navbar/components/nav-links";

export default function Footer() {
  // Separate internal and external links
  const internalLinks = footerLinks.filter((route) => route?.social !== true);
  const socialLinks = footerLinks.filter((route) => route?.social === true);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
      {/* Navigation Links */}
      <div className="flex flex-col">
        <h3 className="font-semibold mb-2">Navigation</h3>
        {internalLinks.map((route, index) => (
          <NavLinks
            key={index}
            routeHref={route.href}
            routeLabel={
              route.label.charAt(0).toUpperCase() + route.label.slice(1)
            }
            className="text-muted-foreground hover:text-primary hover:underline"
            newTab={true}
          />
        ))}
      </div>

      {/* Social Links */}
      <div className="flex flex-col">
        <h3 className="font-semibold mb-2">Connect</h3>
        {socialLinks.map((route, index) => (
          <NavLinks
            key={index}
            routeHref={route.href}
            routeLabel={
              route.label.charAt(0).toUpperCase() + route.label.slice(1)
            }
            className="text-muted-foreground hover:text-primary hover:underline"
            newTab={true}
          />
        ))}
      </div>

      {/* Additional Info */}
      <div className="flex flex-col items-center text-center
        col-span-2 md:col-span-1"
      >
        <h3 className="font-semibold mb-2">Contact</h3>
        <p className="text-sm text-muted-foreground">
          Feel free to reach out through any of the social links above!
        </p>
      </div>
    </div>
  );
}
