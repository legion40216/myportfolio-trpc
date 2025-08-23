"use client";
import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ProjectIdProps } from "../view/project-view";

import EmptyState from "@/components/global-ui/empty-state";
import Client from "../components/client";

export const ProjectSection = ({ projectId }: ProjectIdProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary
        fallback={
          <EmptyState
            title="Error loading project"
            subtitle="Please try again later."
          />
        }
      >
        <ProjectSectionContent projectId={projectId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProjectSectionContent = ({ projectId }: ProjectIdProps) => {
  const trpc = useTRPC();
  const { data: technologiesData } = useSuspenseQuery(
    trpc.technologies.getAll.queryOptions()
  );
  const { data: projectData } = useSuspenseQuery(
    trpc.projects.getById.queryOptions({ projectId })
  );

  const technologies = technologiesData.technologies;
  const project = projectData.project;

  // Handle the null case
  if (!project) {
    return (
      <EmptyState
        title="Project not found"
        subtitle="The project you're looking for doesn't exist."
      />
    );
  }

  const formattedData = {
    technologies: technologies.map((item) => ({
      id: item.id,
      title: item.title,
    })),
  };

  const formattedProject = {
    id: project.id,
    title: project.title,
    description: project.description,
    webLink: project.webLink,
    githubLink: project.githubLink,
    imgSrc: project.imgSrc,
    isFeatured: project.isFeatured,
    isArchived: project.isArchived,
    technologies: project.technologies.map((item) => ({
      technologyId: item.technologyId,
    })),
  };

  return (
    <div>
      <Client
        formattedData={formattedData}
        initialData={formattedProject}
      />
    </div>
  );
};
