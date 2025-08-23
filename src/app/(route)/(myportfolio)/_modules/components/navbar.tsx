import React from 'react'
import NavLeft from './navbar/nav-left'
import NavRight from './navbar/nav-right'

export default function Navbar() {
  return (
    <div className='flex items-center justify-between gap-4 py-4'>
      <NavLeft />
      <NavRight />
    </div>
  )
}
