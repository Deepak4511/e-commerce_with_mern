import React from 'react'
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=' flex min-h-screen w-full'>
    <div className='hidden lg:flex items-center text-primary-[#000] '>
    <div className="max-w-md space-y-6 text-center text-primary-[#000]">
    <h1 className='text-4xl font-extrabold tracking-tight'>
        welcome to e-commerce Shopping
    </h1>
      </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout;
