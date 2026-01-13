"use client";
import React from "react";
import ProjectForm from "./client/project-form";

import { FormattedTechnologiesData, ProjectFormData } from "@/types/types";

type ClientProps = {
  formattedData: FormattedTechnologiesData;
  initialData: ProjectFormData;
};

export default function Client({ formattedData, initialData }: ClientProps) {
  return (
    <div>
      <ProjectForm
        {...initialData}
        technologiesOptions={formattedData.technologies}
      />
    </div>
  );
}