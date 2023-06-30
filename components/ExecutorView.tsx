'use client';
import { Simulation } from '@/config/interfaces'
import { useShowPopup, useSimulationFetch } from '@/hooks';
import { OutputExecution } from '@/config/interfaces';
import React, { useState } from 'react'

interface Props {
  simulations: Simulation[];
}

export const ExecutorView: React.FC<Props> = ({ simulations }) => {
  const { handleHidePopup, handleShowPopup, showPopup } = useShowPopup();
  const { executeSimulation } = useSimulationFetch();
  const [outputExecution, setOutputExecution] = useState<OutputExecution>();
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation>();

  const handleExecuteSimulation = async (
    simulation: Simulation
  ) => {
    const outputExecutionAux = await executeSimulation(simulation.id);
    setOutputExecution(outputExecutionAux);
    // handleHidePopup();
  }

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
                        onClick={() => {
                          handleShowPopup();
                          setSelectedSimulation(simulation);
                          // handleExecuteSimulation(simulation);
                        }}
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
        {
          showPopup && selectedSimulation && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                          {selectedSimulation?.description}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {selectedSimulation?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    {
                      outputExecution && (
                        <div className="mt-5">
                          <h1 className="text-sm font-medium text-gray-500 ">Setup</h1>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Equipo</span>
                              <span className="text-sm text-gray-500">{outputExecution.setup.equipment}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Arduinos</span>
                              {
                                outputExecution.setup.arduinos.map((arduino, index) => (
                                  <span key={index} className="text-sm text-gray-500">{arduino}</span>
                                ))
                              }
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Válvulas</span>
                              {
                                outputExecution.setup.components.map((valve, index) => (
                                  <span key={index} className="text-sm text-gray-500">{valve.description}</span>
                                ))
                              }
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-500">Eventos</span>
                              {
                                outputExecution.simulation.events.map((event, index) => (
                                  <>
                                    <span key={index} className="text-sm text-gray-500">{event.time}</span>
                                    <span key={index} className="text-sm text-gray-500">{event.component}</span>
                                    <span key={index} className="text-sm text-gray-500">{event.intensity}</span>
                                  </>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      )
                    }
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button type="button" onClick={() => handleExecuteSimulation(selectedSimulation!)} className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                        Ejecutar
                      </button>
                      <button type="button" onClick={() => handleHidePopup()} className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )

        }
      </div>
    </>
  )
}
