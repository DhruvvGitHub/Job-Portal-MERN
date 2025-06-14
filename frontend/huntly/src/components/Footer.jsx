import { Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='p-8 flex items-center justify-between border-t-2 mt-8'>
        <div>
          <h2 className='text-xl font-semibold'>Hunt<span className='text-blue-600'>ly</span></h2>  
          <p>All rights reserved © 2025 Huntly (India) Ltd.</p>
        </div>
        <div className='flex flex-col gap-2'>
            <p>Connect on social media</p>
            <div className='flex gap-4'>
                <Linkedin className='cursor-pointer' />
                <Instagram className='cursor-pointer' />
                <Twitter className='cursor-pointer' />
            </div>
        </div>
    </div>
  )
}

export default Footer