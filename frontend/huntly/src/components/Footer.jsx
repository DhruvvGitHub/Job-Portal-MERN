import { Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-red-100 py-8 flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold'>Hunt<span className='text-blue-600'>ly</span></h2>  
          <p>All rights reserved © 2025 Huntly (India) Ltd.</p>
        </div>
        <div className='flex flex-col gap-2'>
            <p>Connect on social media</p>
            <div className='flex gap-2'>
                <Linkedin />
                <Instagram />
                <Twitter />
            </div>
        </div>
    </div>
  )
}

export default Footer