"use client";
import React, { Suspense } from 'react';

import { format } from "date-fns";
import { useTRPC } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';

import EmptyState from '@/components/global-ui/empty-state';
import Client from '../components/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const TechnologiesSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={
        <EmptyState 
          title="Error loading technologies" 
          subtitle="Please try again later." 
        />
        }>
        <TechnologiesSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const TechnologiesSectionContent = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.technologies.getAll.queryOptions());
  const technologies = data.technologies

  const formattedTechnologies = technologies.map((item) => {
    return {
      id: item.id,
      title: item.title,
      createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    };
  });

  return (
    <Client 
      initialData={formattedTechnologies}
    />
  )
};
