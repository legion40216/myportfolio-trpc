"use client";
import React from "react";
import ProjectForm from "./client/project-form";

export type ProjectFormProps = {
  technologies: {
    id: string;
    title: string;
  }[];
};

type ClientProps = {
  initialData: ProjectFormProps;
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
