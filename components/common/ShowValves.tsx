import { Arduino, ComposeComponent } from '@/config/interfaces'
import React from 'react'

interface Props {
  arduino: Arduino;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ShowValves: React.FC<Props> = ({ arduino, handleCheckboxChange }) => {
  const valves: ComposeComponent[] = arduino.composeComponents.filter((composeComponent) => composeComponent.typeComponent.description === 'Valve');
  return (
    <>
      {
        valves.map((valve) => (
          <div key={valve.id} className="flex items-center space-x-2">
            <input
              id={valve.id}
              type="checkbox"
              value={valve.id}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor={valve.id} className="block text-sm font-medium text-gray-700 dark:text-white">{valve.description}</label>

          </div>
        ))
      }
    </>
  )
}
