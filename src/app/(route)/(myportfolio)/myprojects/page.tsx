import React from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import MyProjectsView from "./_modules/view/myprojects-view";

export default async function Page() {
  
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.projects.getAll.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProjectsView />
    </HydrationBoundary>
  );
}
