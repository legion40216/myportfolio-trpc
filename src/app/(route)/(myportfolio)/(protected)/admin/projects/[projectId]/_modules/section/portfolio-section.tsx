"use client";
import React, { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { PortfolioIdProps } from "../view/portfolio-view";

import EmptyState from "@/components/global-ui/empty-state";
import Client from "../components/client";

export const PortfolioSection = ({ portfolioId }: PortfolioIdProps) => {
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
        <PortfolioSectionContent portfolioId={portfolioId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const PortfolioSectionContent = ({ portfolioId }: PortfolioIdProps) => {
  const trpc = useTRPC();
  const { data: technologiesData } = useSuspenseQuery(trpc.technologies.getAll.queryOptions());
  const { data: portfolioData } = useSuspenseQuery(trpc.portfolios.getById.queryOptions({portfolioId}));
 
  const technologies = technologiesData.technologies;
  const portfolio = portfolioData.portfolio;

  // Handle the null case
  if (!portfolio) {
    return (
      <EmptyState 
        title="Portfolio not found" 
        subtitle="The portfolio you're looking for doesn't exist." 
      />
    );
  }

  const formattedData = {
    technologies: technologies.map(item => ({
      id: item.id,
      title: item.title
    }))
  };

  const formattedProduct = {
    id: portfolio.id,
    title: portfolio.title,
    description: portfolio.description,
    webLink: portfolio.webLink,
    githubLink: portfolio.githubLink,
    imgSrc: portfolio.imgSrc,
    isFeatured: portfolio.isFeatured,
    isArchived: portfolio.isArchived,
    technologies: portfolio.technologies.map((item) => ({
      technologyId: item.technologyId,
    })),
  };

  return (
    <div>
      <Client 
        formattedData={formattedData} 
        initialData={formattedProduct} 
      />
    </div>
  );
};
