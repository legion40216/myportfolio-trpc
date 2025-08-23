"use client";
import React from "react";
import PortfolioForm from "./client/portfolio-form";

export type formattedDataProps = {
  technologies: { 
    id: string; 
    title: string; 
  }[];
};

export type initialDataProps = {
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
  initialData: initialDataProps;
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
