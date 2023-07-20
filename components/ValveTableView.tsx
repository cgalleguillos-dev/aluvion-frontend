'use client';
import { ResponseComposeComponent } from '@/config/interfaces';
import React from 'react'

interface Props {
  valveSelected: ResponseComposeComponent;
}

export const ValveTableView: React.FC<Props> = ({ valveSelected }) => {
  console.log(valveSelected.events)
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
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center w-8 h-8 mx-auto text-sm font-medium text-gray-900 dark:text-white //centralo verticalmente ">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                    <div className="flex flex-row items-center justify-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 ">{
                      row.intensity
                    }</div>
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                    <div className="flex flex-row items-center justify-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 ">{
                      row.startTime
                    }</div>

                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap ">
                    <div className="flex flex-row items-center justify-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 ">{
                      row.endTime
                    }</div>
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
