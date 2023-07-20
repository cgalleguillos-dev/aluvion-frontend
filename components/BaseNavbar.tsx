import React from 'react'
import { BackButton } from './common';

interface Props {
  title: string;
  isPage?: boolean;
  children?: React.ReactNode;
}

export const BaseNavbar: React.FC<Props> = ({ title, isPage, children }) => {

  return (
    <>
      <div className="text-white bg-[#0e314f] h-20 flex items-center justify-center">
        <div className="flex items-center justify-between w-full px-6">
          {
            !isPage && (<BackButton />)
          }
          <h1 className="text-2xl font-medium">{isPage ? title.toUpperCase() : title}</h1>
          <div className="flex items-center space-x-4">
            {children}
          </div>
        </div>
      </div>

    </>
  )
}
