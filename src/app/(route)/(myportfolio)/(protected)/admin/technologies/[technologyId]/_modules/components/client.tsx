"use client";
import React from "react";
import TechnologyForm from "./client/technology-form";

export type TechnologyFormProps = {
  id: string;
  title: string;
};

type ClientProps = {
  initialData: TechnologyFormProps;
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
