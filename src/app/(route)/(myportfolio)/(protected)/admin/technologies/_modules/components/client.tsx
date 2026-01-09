"use client"
import React from 'react'

import { DataTable } from '@/components/global-ui/shadcn_ui-custom/data-table'
import { columns } from './client/columns'

export type TecnologiesAdmin = {
  id: string;
  title: string;
}

type Props = {
  initialData: TecnologiesAdmin[];
};

export default function Client({ initialData }: Props) {
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
