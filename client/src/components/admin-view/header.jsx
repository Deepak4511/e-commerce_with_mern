import React from 'react'
import { Button } from '../ui/button';
import { LogOut, Menu } from 'lucide-react';

const AdminHeader = ({setOpen}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white text-gray-900 shadow-sm">
    <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
      <Menu />
      <span className='sr-only'>toggle Menu</span>
    </Button>
    <div className='flex flex-1 justify-end'>
    <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"><LogOut />Logout</Button>
      
    </div>
      
    </header>
  )
}

export default AdminHeader;
