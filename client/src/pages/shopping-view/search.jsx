import { Input } from '@/components/ui/input'
import React from 'react'

const SearchProducts = () => {
  return (
    <div className='container mx-auto md:px-4 py-8'>
        <div className='flex justify-center mb-8'>
            <div className='w-full flex items-center'>
                <Input placeholder='Search Products...' className='py-6'/>
            </div>
        </div>
        <div>Search Results</div>
    </div>
  )
}

export default SearchProducts
