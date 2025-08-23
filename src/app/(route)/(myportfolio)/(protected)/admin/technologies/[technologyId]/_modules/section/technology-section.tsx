"use client";
import React, { Suspense } from 'react';

import { TechnologyIdProps } from '../view/technology-view';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import EmptyState from '@/components/global-ui/empty-state';
import Client from '../components/client';

export const TechnologySection = ({ technologyId }: TechnologyIdProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={
        <EmptyState 
          title="Error loading size" 
          subtitle="Please try again later." 
        />
      }>
        <TechnologySectionContent technologyId={technologyId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const TechnologySectionContent = ({ technologyId }: TechnologyIdProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.technologies.getById.queryOptions({technologyId}));
  const technology = data.technology

  if (!technology) {
    return (
      <EmptyState 
        title="Technology not found" 
        subtitle="We couldn't find the Technology you're looking for." 
      />
    );
  }

  const formattedTechnology = {
    id: technology.id,
    title: technology.title,
  };

  return (
    <div>
      <Client initialData={formattedTechnology} />
    </div>
  );
};