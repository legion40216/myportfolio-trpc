import React from "react";

import { footerLinks } from "@/data/links";

import NavLinks from "@/components/global-ui/nav-links";

export default function Footer() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
      {footerLinks.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            section.info ? "items-center text-center col-span-2 md:col-span-1" : ""
          }`}
        >
          <h3 className="font-semibold mb-2">{section.title}</h3>

          {/* If section contains simple info (like Contact) */}
          {section.info && (
            <p className="text-sm text-muted-foreground">{section.info}</p>
          )}

          {/* If section contains link items */}
          {section.links &&
            section.links.map((link, i) => (
              <NavLinks
                key={i}
                routeHref={link.href}
                routeLabel={link.label}
                className="text-muted-foreground hover:text-primary hover:underline"
                newTab={true}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

