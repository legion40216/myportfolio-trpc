"use client";
import React from "react";
import PortfolioForm from "./client/portfolio-form";

export type PortfolioFormProps = {
  technologies: {
    id: string;
    title: string;
  }[];
};

type ClientProps = {
  initialData: PortfolioFormProps;
};

export default function Client({ initialData }: ClientProps) {
  return (
    <div>
      <PortfolioForm 
        technologies={initialData.technologies}
      />
    </div>
  );
}
