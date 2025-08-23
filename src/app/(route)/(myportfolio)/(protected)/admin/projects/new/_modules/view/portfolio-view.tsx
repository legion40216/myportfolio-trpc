import React from "react";

import HeadingState from "@/components/global-ui/heading-state";
import { Separator } from "@/components/ui/separator";
import { PortfolioSection } from "../section/portfolio-section";

export default function PortfolioView() {
  return (
    <div className="space-y-5">
      <HeadingState
        title="Portfolio form"
        subtitle="Create portfolio for your application"
      />

      <Separator />

      <PortfolioSection />
    </div>
  );
}

