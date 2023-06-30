'use client';
import { Equipment, Simulation } from '@/config/interfaces';
import React from 'react';
import { CustomButton } from './common';
import { useShowPopup } from '@/hooks';
import { ShowSimulationInfo } from './common/ShowSimulationInfo';
import { NewSimulationForm } from './NewSimulationForm';

interface Props {
  simulations: Simulation[];
  equipments: Equipment[];
}

export const SimulationView: React.FC<Props> = ({ simulations, equipments }) => {
  const { showPopup, handleShowPopup, handleHidePopup } = useShowPopup();
  return (
    <>
      <div className="w-screen h-screen mx-10 mt-4">
        <div className="sm:-mx-6 lg:-mx-10">
          <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg ">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="flex flex-row justify-between bg-gray-50">
                  <div className="flex flex-row items-center justify-between">
                    <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Descripción
                    </div>
                    <input type="text" placeholder="Buscar Simulación" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-96 dark:text-gray-400"
                    // onChange={handleFilterChange}
                    />
                  </div>
                </div>
                <div className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {
                    simulations?.map((simulation, index) => (
                      <div key={index}
                        onClick={() => handleShowPopup()}
                        className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <div className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-200">{simulation.description}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <CustomButton
            description="Volver"
            onClick={() => { }}
          />
          <NewSimulationForm
            equipments={equipments}
          />
        </div>
        {
          showPopup && (
            <ShowSimulationInfo
              simulation={simulations[0]}
              handleHideForm={handleHidePopup}

            />
          )
        }
      </div>
    </>
  )
};
