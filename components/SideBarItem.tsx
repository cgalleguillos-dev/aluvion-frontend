import { ISideBar } from '@/config/interfaces';
import Link from 'next/link';
import React from 'react'

interface Props {
  iSidebar: ISideBar;
  isActive: boolean;
  onItemClick: () => void;
}

export const SideBarItem: React.FC<Props> = ({ iSidebar: { href, label, subLabel }, isActive, onItemClick }) => {
  return (
    <>
      <Link href={href} className={`inline-flex items-center w-full px-2 py-3 space-x-2 transition duration-150 ease-linear border-b border-slate-700 hover:bg-white/5
        ${isActive ? 'bg-white/5' : ''
        }`}
        onClick={onItemClick}
      >
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-5 text-white">{label}</span>
          <span className="hidden text-sm text-white/50 md:block">{subLabel}</span>
        </div>
      </Link>
    </>
  )
}
