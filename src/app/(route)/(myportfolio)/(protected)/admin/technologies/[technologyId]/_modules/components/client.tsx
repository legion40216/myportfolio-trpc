"use client";
import React from "react";
import TechnologyForm from "./client/technology-form";
import { TechnologyOption } from "@/types/types";

type ClientProps = {
  initialData: TechnologyOption;
};

export default function Client({ initialData }: ClientProps) {
  return (
    <div>
      <TechnologyForm
        id={initialData.id}
        title={initialData.title}
      />
    </div>
  );
}
