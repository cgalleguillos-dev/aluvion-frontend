'use client';
import { ComposeComponent, IEventValves } from '@/config/interfaces';
import React, { ChangeEvent, useState } from 'react'

interface Props {
  valveSelected: ComposeComponent;
  isEditing: boolean;
  updateValveEvent: (index: number, field: keyof IEventValves, value: string) => void;
  removeEventWithIndexFromValve: (index: number) => void;
}

export const ValveTable: React.FC<Props> = ({ valveSelected, isEditing, updateValveEvent, removeEventWithIndexFromValve }) => {
  return (
    <>
      <div
        className="flex flex-row justify-center w-full overflow-x-auto overflow-y-auto h-96"
      >

        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Orden</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Intensidad</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Tiempo Inicio (Segundos)</th>
              <th scope="col" className="flex flex-row items-center justify-center px-6 py-3 pl-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                Tiempo Final (Segundos)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {
              valveSelected.events?.map((row, index) => (
                <tr className="" key={index}>
                  {
                    isEditing ?
                      (<>
                        <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                          <button
                            className="flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-900 bg-red-500 rounded-full right-2 top-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            onClick={() => removeEventWithIndexFromValve(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </>)
                      :
                      (<td className="px-6 py-4 border border-gray-200 whitespace-nowrap"
                      >
                        <div className="flex items-center justify-center w-8 h-8 mx-auto text-sm font-medium text-gray-900 dark:text-white //centralo verticalmente ">{index + 1}</div>
                      </td>)
                  }
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={row.intensity}
                      className='w-full h-full bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400 dark:opacity-50 '
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        updateValveEvent(index, 'intensity', e.target.value)
                      }}

                    />
                    <div className="flex flex-row items-center justify-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 ">{
                      row.intensity
                    }</div>
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                    <input
                      type="number"
                      placeholder="Tiempo"
                      min="0"
                      className="w-24 px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={row.startTime}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateValveEvent(index, 'startTime', e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                    <input
                      type="number"
                      placeholder="Tiempo"
                      min={row.startTime}
                      className="w-24 px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={row.endTime}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateValveEvent(index, 'endTime', e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div >
    </>
  );
}
