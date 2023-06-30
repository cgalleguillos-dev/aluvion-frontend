'use client';
import { ComposeComponent, IEventValves } from '@/config/interfaces';
import React, { ChangeEvent } from 'react'

interface Props {
  valvesSelected: ComposeComponent[];
  valves: IEventValves[];
  removeRow: (index: number) => void;
  isEditing: boolean;
  updateValveTable: (index: number, field: keyof IEventValves, value: string) => void;
}

export const ValveTable: React.FC<Props> = ({ valvesSelected, valves, updateValveTable, removeRow, isEditing }) => {
  return (
    <div
      className="flex flex-row justify-center w-full overflow-x-auto overflow-y-auto h-96"
    >

      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">

              ID
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Válvula</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Intensidad</th>
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Tiempo (Segundos)</th>
            <th scope="col" className="flex flex-row items-center justify-center px-6 py-3 pl-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
              Tiempo (Segundos)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {valves.map((row, index) => (
            <tr key={index} className=''>
              {
                isEditing ?
                  (<>
                    <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                      <button
                        className="flex items-center justify-center w-6 h-6 text-sm font-medium text-gray-900 bg-red-500 rounded-full right-2 top-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => removeRow(index)}
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
                <select
                  className='w-full'
                  value={[row.valveId, row.valve]}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    updateValveTable(index, 'valveId', e.target.value.split(',')[0])
                    updateValveTable(index, 'valve', e.target.value.split(',')[1])
                  }
                  }
                >
                  <option value=''>Seleccionar</option>
                  {
                    valvesSelected.map((valve, index) => (
                      <option key={index} value={[valve.id, valve.description]}>{valve.description}</option>
                    ))
                  }
                </select>
              </td>
              <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={row.intensity}
                  className='w-full h-full bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-400 dark:opacity-50 '
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateValveTable(index, 'intensity', e.target.value)
                  }
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
                  value={row.time}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateValveTable(index, 'time', e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
}
