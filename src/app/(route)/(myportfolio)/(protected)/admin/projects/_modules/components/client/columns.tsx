"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ProjectsAdmin } from "../client";

import CellActions from "./columns/cell-actions";
import CellLinks from "@/components/global-ui/cell-links";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ProjectsAdmin>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <CellLinks 
        dataId={row.original.id} 
        dataLabel={row.getValue("title")} 
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description;
      return <div className="max-w-[200px] truncate">{description}</div>;
    },
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    cell: ({ row }) => {
      const technologies = row.original.technologies;
      return (
        <div className="flex flex-wrap gap-1">
          {technologies.length > 0 ? (
            technologies.map((item) => (
            <Badge key={item.id} variant="secondary">
              {item.title}
            </Badge>
          ))) : (
            <span className="italic">No technologies</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      const isFeatured = row.getValue<boolean>("isFeatured");
      return (
        <Badge variant={isFeatured ? "default" : "outline"}>
          {isFeatured ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => {
      const isArchived = row.getValue<boolean>("isArchived");
      return (
        <Badge variant={isArchived ? "destructive" : "outline"}>
          {isArchived ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <CellActions itemId={row.original.id} />,
  },
];
