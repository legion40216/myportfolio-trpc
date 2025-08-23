import React from "react";

import HeadingState from "@/components/global-ui/heading-state";
import { Separator } from "@/components/ui/separator";
import { ProjectSection } from "../section/project-section";


export default function ProjectView() {
  return (
    <div className="space-y-5">
      <HeadingState
        title="Project form"
        subtitle="Create project for your application"
      />

      <Separator />

      <ProjectSection />
    </div>
  );
}

