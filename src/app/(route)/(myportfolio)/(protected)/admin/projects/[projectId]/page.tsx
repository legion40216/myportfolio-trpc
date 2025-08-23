import React from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { checkAccess } from "@/utils/checkAccess";

import EmptyState from "@/components/global-ui/empty-state";
import PortfolioView from "./_modules/view/portfolio-view";

interface PageProps {
  params: Promise<{
    portfolioId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { portfolioId } = await params;

  const access = await checkAccess();

  if (!access.allowed) {
    return (
      <EmptyState title="Unauthorized" subtitle={access.reason} />
    );
  }

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(trpc.technologies.getAll.queryOptions()),
    queryClient.prefetchQuery(trpc.portfolios.getById.queryOptions({ portfolioId }))
  ]);


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioView portfolioId={portfolioId} />
    </HydrationBoundary>
  );
}
