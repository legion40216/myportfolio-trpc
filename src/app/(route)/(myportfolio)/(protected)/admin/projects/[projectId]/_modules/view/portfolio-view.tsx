import React from "react";

import HeadingState from "@/components/global-ui/heading-state";
import { Separator } from "@/components/ui/separator";
import { PortfolioSection } from "../section/portfolio-section";

export type PortfolioIdProps = {
  portfolioId: string;
};

export default function PortfolioView({ portfolioId }: PortfolioIdProps) {
  return (
    <div className="space-y-5">
      <HeadingState
        title="Portfolio form"
        subtitle="Update portfolio for your application"
      />

      <Separator />

      <PortfolioSection portfolioId={portfolioId} />
    </div>
  );
}
