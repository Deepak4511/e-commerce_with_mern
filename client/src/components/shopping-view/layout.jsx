import React from 'react'
import { Outlet } from 'react-router-dom'
import Shoppingheader from './header'

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
    <Shoppingheader/>
    <main className='flex-col flex bw-full'>
        <Outlet />
    </main>
      
    </div>
  )
}

export default ShoppingLayout
