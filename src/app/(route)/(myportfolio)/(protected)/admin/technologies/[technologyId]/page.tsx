import React from 'react';

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { checkAccess } from '@/utils/checkAccess';

import EmptyState from '@/components/global-ui/empty-state';
import TechnologyView from './_modules/view/technology-view';

interface PageProps {
  params: Promise<{
    technologyId: string;
  }>;
}

export default async function EditSizePage({ params }: PageProps) {
  const { technologyId } = await params;
  
  const access = await checkAccess();

  if (!access.allowed) {
    return <EmptyState 
      title="Unauthorized" 
      subtitle={access.reason} 
    />;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.technologies.getById.queryOptions({ technologyId })
  );
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TechnologyView technologyId={technologyId} />
    </HydrationBoundary>
  );
}