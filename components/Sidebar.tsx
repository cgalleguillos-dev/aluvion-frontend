'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { SIDE_BAR } from '@/constants'
import { SideBarItem } from './SideBarItem'

export const SideBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  }

  return (
    <div className="w-64 h-screen bg-slate-100 text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex flex-col">
        <div id="menu" className="z-10 w-64 h-screen min-h-screen bg-[#0e314f] text-slate-300 ">
          <div id="logo" className="px-6 my-4">
            <h1 className="text-lg font-bold text-white md:text-2xl">Inicio<span className="text-blue-500"></span></h1>

          </div>
          <div id="profile" className="px-6 py-10">
            <p className="text-slate-500">Welcome back,</p>
            <a href="#" className="inline-flex items-center space-x-2">
              <span>
                <img className="w-8 h-8 rounded-full" src="https://www.softzone.es/app/uploads/2018/04/guest.png" alt=""></img>
              </span>
              <span className="text-sm font-bold md:text-base">
                Admin
              </span>
            </a>
          </div>
          <div id="nav" className="w-full px-6">
            {
              SIDE_BAR.map((iSidebar, index) => (
                <SideBarItem key={index} iSidebar={iSidebar}
                  isActive={activeIndex === index}
                  onItemClick={() => handleItemClick(index)}
                />
              ))
            }
            <Link href="/auth/login" className="inline-flex items-center w-full px-2 py-3 space-x-2 transition duration-150 ease-linear hover:bg-white/5"
              onClick={() => localStorage.removeItem('token')}
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5 text-slate-300">Salir</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
