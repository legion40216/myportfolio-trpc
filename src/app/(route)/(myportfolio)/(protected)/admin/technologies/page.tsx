import React from "react";

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { checkAccess } from "@/utils/checkAccess";

import EmptyState from "@/components/global-ui/empty-state";
import TechnologiesView from "./_modules/view/technologies-view";

export default async function Page() {
   const access = await checkAccess();

  if (!access.allowed) {
    return <EmptyState title="Unauthorized" subtitle={access.reason} />;
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.technologies.getAll.queryOptions()
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TechnologiesView/>
    </HydrationBoundary>
  )
}