'use client';
import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

import EmptyState from '@/components/global-ui/empty-state';
import FeaturedCard from '@/components/global-ui/featured-card'

export const FeaturedSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={
        <EmptyState 
        title="Error loading featured portfolios" 
        subtitle="Please try again later." 
        />
        }>
        <FeaturedSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const FeaturedSectionContent = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.projects.getAll.queryOptions());
  const projects = data.projects

  if (projects.length === 0) {
    return <EmptyState 
    title="No featured projects found"
    subtitle="Please try again later."
    />;
  }

  const filteredFeaturedProjects = projects.filter(
    (item) => item.isFeatured === true
  );

  const formattedProjects = filteredFeaturedProjects.map((item) => ({
    imgSrc: item.imgSrc,
    title: item.title,
    description: item.description,
    link: item.webLink,
    github: item.githubLink,
    technologies: item.technologies.map((item) => (item.technology.title)),
  }));

  return (
    <div className="space-y-2">
        {formattedProjects.map((card) => (
            <FeaturedCard
            key={card.title}
            imgSrc={card.imgSrc}
            title={card.title}
            description={card.description}
            link={card.link}
            github={card.github}
            technologies={card.technologies}
            />
        ))}
    </div>
  )
}
