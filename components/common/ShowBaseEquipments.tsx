'use client';
import { BaseEquipment } from '@/config/interfaces';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BaseNavbar } from '../BaseNavbar';

interface Props {
  equipments: BaseEquipment[];
}

export const ShowBaseEquipments: React.FC<Props> = ({ equipments }) => {
  const router = useRouter();
  return (
    <div className='w-screen h-screen'>
      <BaseNavbar title='Equipos Base' isPage />
      <div className='mx-10 mt-4 '>
        <div className="">
          <ul className="flex flex-wrap justify-center gap-4">
            {
              equipments.map((equipment, index) => (
                <li key={index} className="w-full transition duration-300 ease-in-out transform sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:cursor-pointer hover:scale-105">
                  <div className="relative flex flex-col items-center justify-center w-full h-64 overflow-hidden border border-gray-300 rounded-lg shadow-sm dark:border-gray-700">
                    <div className="relative w-full px-6 py-4 bg-whit e dark:bg-gray-800">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{equipment.description}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">Cantidad de Arduinos: {equipment.arduinos?.length}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">Cantidad de Válvulas: {
                        equipment.arduinos?.map((arduino) => (
                          arduino.composeComponents?.length
                        )).reduce((a, b) => a + b, 0)
                      }
                      </p>
                      <button
                        className="absolute px-4 py-1 text-xs font-medium tracking-wider text-white uppercase transition-colors duration-200 transform bg-gray-900 rounded bottom-4 right-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        onClick={() => router.push(`/auth/base-equipments/${equipment.id}`)}
                      > Ver </button>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};
