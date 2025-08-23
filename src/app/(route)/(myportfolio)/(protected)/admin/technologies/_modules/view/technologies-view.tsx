import React from "react";

import Link from "next/link";

import HeadingState from "@/components/global-ui/heading-state";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TechnologiesSection } from "../sections/technologies-section";

export default function TechnologiesView() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <HeadingState title="Technologies" subtitle="Manage technologies" />

        <Button asChild> 
          <Link href="/admin/technologies/new">Add new</Link>
        </Button>
      </div>

      <Separator />

      <TechnologiesSection/>
    </div>
  );
}
