'use client';
import { Equipment, Simulation } from '@/config/interfaces';
import React from 'react';
import { CustomButton } from './common';
import { useShowPopup } from '@/hooks';
import { ShowSimulationInfo } from './common/ShowSimulationInfo';
import { NewSimulationForm } from './NewSimulationForm';
import { BaseNavbar } from './BaseNavbar';

interface Props {
  simulations: Simulation[];
  equipments: Equipment[];
}

export const SimulationView: React.FC<Props> = ({ simulations, equipments }) => {
  const [selectedSimulation, setSelectedSimulation] = React.useState<Simulation>();
  const { showPopup, handleShowPopup, handleHidePopup } = useShowPopup();

  const handleShowSimulationInfo = (simulation: Simulation) => {
    setSelectedSimulation(simulation);
    handleShowPopup();
  }

  return (
    <>
      <div className="w-screen h-screen">
        <BaseNavbar title='Simulaciones' isPage >
          <NewSimulationForm
            equipments={equipments}
          />
        </BaseNavbar>
        <div className="mx-10">
          <div className="sm:-mx-6 lg:-mx-10">
            <div className="inline-block w-full align-middle ">
              <div className="border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg ">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {
                      simulations?.map((simulation, index) => (
                        <div key={index}
                          onClick={
                            () => handleShowSimulationInfo(simulation)
                          }
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
          <div className="flex flex-row justify-end ">
          </div>
          {
            showPopup && selectedSimulation && (
              <ShowSimulationInfo
                simulation={selectedSimulation!}
                handleHideForm={handleHidePopup}

              />
            )
          }
        </div>
      </div>
    </>
  )
};
