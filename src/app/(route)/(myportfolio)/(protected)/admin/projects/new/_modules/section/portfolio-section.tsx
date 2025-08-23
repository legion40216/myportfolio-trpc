"use client";
import React, { Suspense } from "react";

import { useTRPC } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";

import EmptyState from "@/components/global-ui/empty-state";
import Client from "../components/client";

export const PortfolioSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary
        fallback={
          <EmptyState
            title="Error loading portfolio"
            subtitle="Please try again later."
          />
        }
      >
        <PortfolioSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const PortfolioSectionContent = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.technologies.getAll.queryOptions());
  const technologies = data.technologies

  const formattedData = {
    technologies: technologies.map(item => ({
      id: item.id,
      title: item.title
    }))
  };

  return (
    <div>
      <Client initialData={formattedData} />
    </div>
  );
};
