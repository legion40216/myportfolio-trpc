import React from 'react'

import { checkAccess } from '@/utils/checkAccess';

import HeadingState from '@/components/global-ui/heading-state'
import { Separator } from '@/components/ui/separator'
import Client from './_modules/components/client'
import EmptyState from '@/components/global-ui/empty-state';

export default async function Page() {
    const access = await checkAccess();
  
    if (!access.allowed) {
      return <EmptyState title="Unauthorized" subtitle={access.reason} />;
    }
  
  return (
    <div className='space-y-5'>
      <HeadingState 
      title="Technology form" 
      subtitle="Create Technology for your application" 
      /> 

      <Separator />

      <Client />
    </div>
  )
}
