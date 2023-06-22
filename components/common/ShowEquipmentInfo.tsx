import { Equipment } from '@/config/interfaces';
import React from 'react'
import CustomButton from './CustomButton';
import Loading from './Loading';


interface Props {
  equipment: Equipment;
  setShowInfoEquipment: (showInfoEquipment: boolean) => void;
  handleDeleteEquipment: () => void;
  loading: boolean;
}
export const ShowEquipmentInfo: React.FC<Props> = ({
  equipment,
  setShowInfoEquipment,
  handleDeleteEquipment,
  loading
}) => {

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-400">{equipment?.description}</h3>
                  <button
                    className="absolute top-0 right-0 mt-4 mr-4"
                    onClick={() => setShowInfoEquipment(false)}
                  >
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                </div>
                <div className="mt-2">
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope='col'
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                          Descripción
                        </th>
                        <th
                          scope='col'
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                          Arduino
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {equipment?.composeComponents.map((component, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-400">{component.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-400">{component.arduino.description}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 flex flex-row justify-between mt-4 mx-4">
            <CustomButton
              description="Desactivar"
              onClick={handleDeleteEquipment}
            />
          </div>
        </div>
      </div>
      {
        loading && <Loading />
      }
    </div >
  )
}
