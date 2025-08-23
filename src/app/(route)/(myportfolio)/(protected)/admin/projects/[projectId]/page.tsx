import React from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { checkAccess } from "@/utils/checkAccess";

import EmptyState from "@/components/global-ui/empty-state";
import ProjectView from "./_modules/view/project-view";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { projectId } = await params;

  const access = await checkAccess();

  if (!access.allowed) {
    return (
      <EmptyState title="Unauthorized" subtitle={access.reason} />
    );
  }

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(trpc.technologies.getAll.queryOptions()),
    queryClient.prefetchQuery(trpc.projects.getById.queryOptions({ projectId }))
  ]);


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectView projectId={projectId} />
    </HydrationBoundary>
  );
}
