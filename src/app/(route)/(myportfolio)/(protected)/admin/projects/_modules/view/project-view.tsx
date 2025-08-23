import React from "react";

import Link from "next/link";

import HeadingState from "@/components/global-ui/heading-state";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectSection } from "../sections/project-section";

export default function ProjectView() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <HeadingState title="Projects" subtitle="Manage project" />

        <Button asChild> 
          <Link href="/admin/projects/new">Add new</Link>
        </Button>
      </div>

      <Separator />

      <ProjectSection/>
    </div>
  );
}
