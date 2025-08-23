import React from "react";

import HeadingState from "@/components/global-ui/heading-state";
import { Separator } from "@/components/ui/separator";
import { TechnologySection } from "../section/technology-section";

export type TechnologyIdProps = {
  technologyId: string;
};

export default function TechnologyView({ technologyId }: TechnologyIdProps) {
  return (
    <div className="space-y-5">
      <HeadingState
        title="Technology form"
        subtitle="Update technology for your application"
      />

      <Separator />

      <TechnologySection technologyId={technologyId} />
    </div>
  );
}
