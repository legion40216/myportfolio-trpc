"use client"
import React from 'react'

import { DataTable } from '@/components/global-ui/shadcn_ui-custom/data-table'
import { columns } from './client/columns'
import { FormattedTechnologyForTable } from '@/types/types';

type ClientProps = {
  initialData: FormattedTechnologyForTable[]
};

export default function Client({ initialData }: ClientProps) {
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
