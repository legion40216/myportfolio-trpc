'use client';
import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

import EmptyState from '@/components/global-ui/empty-state';
import ProjectCard from '@/components/global-ui/project-card';

export const ProjectListSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={
        <EmptyState 
        title="Error loading projects" 
        subtitle="Please try again later." 
        />
        }>
        <ProjectListSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const ProjectListSectionContent = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.projects.getAll.queryOptions());
  const projects = data.projects

  if (projects.length === 0) {
    return <EmptyState 
    title="No projects found"
    subtitle="Please try again later."
    />;
  }

  const filteredProjects = projects.filter((item) => !item.isArchived);

  const formattedProjects = filteredProjects.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    isFeatured: item.isFeatured,
    imgSrc: item.imgSrc,
    link: item.webLink,
    github: item.githubLink,
    technologies: item.technologies.map((tech) => (tech.technology.title)),
  }));

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 items-start'>
      {formattedProjects.map((card) => (
        <ProjectCard
          key={card.id}
          imgSrc={card.imgSrc}
          title={card.title}
          isFeatured={card.isFeatured}
          description={card.description}
          technologies={card.technologies}
          link={card.link}
          github={card.github}
        />
      ))}
    </div>
  )
}
