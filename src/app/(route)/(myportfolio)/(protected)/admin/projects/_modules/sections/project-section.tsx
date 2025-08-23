"use client";
import React, { Suspense } from 'react';

import { useTRPC } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';
import { format } from "date-fns";
import { useSuspenseQuery } from '@tanstack/react-query';

import EmptyState from '@/components/global-ui/empty-state';
import Client from '../components/client';

export const ProjectSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={
        <EmptyState 
          title="Error loading projects" 
          subtitle="Please try again later." 
        />
        }>
        <ProjectSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProjectSectionContent = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.projects.getAll.queryOptions());
  const projects = data.projects

  const formattedProjects = projects.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      technologies: item.technologies.map((item) => ({
        id: item.technology.id,
        title: item.technology.title,
      })),
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    };
  });

  return (
    <Client 
      initialData={formattedProjects}
    />
  )
};
