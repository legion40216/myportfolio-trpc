"use client";
import React from "react";
import ProjectForm from "./client/project-form";

import { FormattedTechnologiesData } from "@/types/types";

type ClientProps = {
  initialData: FormattedTechnologiesData;
};

export default function Client({ initialData }: ClientProps) {
  return (
    <div>
      <ProjectForm
        technologies={initialData.technologies}
      />
    </div>
  );
}
