"use client"
import React from 'react'

import { DataTable } from '@/components/global-ui/shadcn_ui-custom/data-table'
import { columns } from './client/columns'

export type ProjectsAdmin = { 
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  technologies: {
    id: string;
    title: string;
  }[];
  createdAt: string;
};

type Props = {
  initialData: ProjectsAdmin[];
};

export default function Client({ initialData } : Props) {
  return (
    <div>
      <DataTable 
        columns={columns} 
        data={initialData} 
        searchKey="title" 
      />
    </div>
  );
}
