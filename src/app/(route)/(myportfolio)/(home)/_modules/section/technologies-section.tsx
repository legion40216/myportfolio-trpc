"use client";
import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import EmptyState from "@/components/global-ui/empty-state";
import { Badge } from "@/components/ui/badge";

export const TechnologiesSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary
        fallback={
          <EmptyState
            title="Error loading technologies"
            subtitle="Please try again later."
          />
        }
      >
        <TechnologiesContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const TechnologiesContent = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.technologies.getAll.queryOptions()); 
  const technologies = data.technologies;

  if (!technologies || technologies.length === 0) {
    return (
      <EmptyState
        title="No technologies found"
        subtitle="Check back later."
      />
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Badge
          key={tech.id}
          className="bg-portfolio-secondary 
          text-portfolio-secondary-foreground"
        >
          {tech.title}
        </Badge>
      ))}
    </div>
  );
};
