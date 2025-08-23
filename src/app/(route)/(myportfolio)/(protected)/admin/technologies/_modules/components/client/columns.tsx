"use client"
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TecnologiesAdmin } from "../client";

import CellLinks from "@/components/global-ui/cell-links";
import CellActions from "./columns/cell-actions";

export const columns: ColumnDef<TecnologiesAdmin>[] = [
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
