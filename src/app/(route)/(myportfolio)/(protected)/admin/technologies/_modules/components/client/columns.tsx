"use client"
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { FormattedTechnologyForTable } from "@/types/types";

import CellLinks from "@/components/global-ui/shadcn_ui-custom/cell-links";
import CellActions from "./columns/cell-actions";

export const columns: ColumnDef<FormattedTechnologyForTable>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => 
      <CellLinks 
      dataId    = {row.original.id} 
      dataLabel = {row.getValue("title")} 
      /> 
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const itemId = row.original.id
      return (
        <CellActions 
           itemId = {itemId}
        />
      )
    },
  },
];
