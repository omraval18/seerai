import { Loader2 } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'><Loader2 className="animate-spin h-5 w-5" /></div>
  )
}
