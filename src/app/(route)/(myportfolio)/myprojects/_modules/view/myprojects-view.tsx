import React from 'react'
import { ProjectListSection } from '../section/project_list-section';

export default function MyProjectsView() {
  return (
    <div className='space-y-4'>
        <h2 className='text-2xl font-medium'>Other notable projects</h2>
        <ProjectListSection />
    </div>
  );
}
