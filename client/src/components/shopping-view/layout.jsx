import React from 'react'
import { Outlet } from 'react-router-dom'

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
    <main className='flex-col flex bw-full'>
        <Outlet />
    </main>
      
    </div>
  )
}

export default ShoppingLayout
