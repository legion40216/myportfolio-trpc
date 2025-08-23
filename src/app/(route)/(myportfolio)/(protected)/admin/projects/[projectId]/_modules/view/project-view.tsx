import React from "react";

import HeadingState from "@/components/global-ui/heading-state";
import { Separator } from "@/components/ui/separator";
import { ProjectSection } from "../section/project-section";

export type ProjectIdProps = {
  projectId: string;
};

export default function ProjectView({ projectId }: ProjectIdProps) {
  return (
    <div className="space-y-5">
      <HeadingState
        title="Project form"
        subtitle="Update project for your application"
      />

      <Separator />

      <ProjectSection projectId={projectId} />
    </div>
  );
}
