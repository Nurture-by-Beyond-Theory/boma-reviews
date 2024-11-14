'use client'

import React from 'react'
import Navbar from './navbar'
import Footer from './footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> =  ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      
      <main className='w-full flex-grow pt-10'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
