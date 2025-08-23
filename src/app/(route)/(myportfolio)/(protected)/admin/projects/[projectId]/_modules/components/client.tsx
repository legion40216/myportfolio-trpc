"use client";
import React from "react";
import PortfolioForm from "./client/project-form";

export type formattedDataProps = {
  technologies: { 
    id: string; 
    title: string; 
  }[];
};

export type ProjectFormProps = {
  id: string;
  title: string;
  description: string;
  webLink: string;
  githubLink: string;
  imgSrc: string;
  isFeatured: boolean;
  isArchived: boolean;
  technologies: {
    technologyId: string;
  }[];
};

type ClientProps = {
  formattedData: formattedDataProps;
  initialData: ProjectFormProps;
};

export default function Client({ formattedData, initialData }: ClientProps) {
  return (
    <div>
      <PortfolioForm
        {...initialData}
        technologieOptions={formattedData.technologies}
      />
    </div>
  );
}
