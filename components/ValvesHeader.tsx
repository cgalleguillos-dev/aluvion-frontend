import { ComposeComponent } from '@/config/interfaces';
import React from 'react';

interface Props {
  valves: ComposeComponent[];
  selectedValve: ComposeComponent;
  setValveSelected: (valve: ComposeComponent) => void;
}

export const ValvesHeader: React.FC<Props> = ({ valves, selectedValve, setValveSelected }) => {

  const handleSelectValve = (valve: ComposeComponent) => {
    setValveSelected(valve);
  };

  return (
    <div>
      <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
        {
          valves.map((valve, index) => (
            <li key={index} className={`flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400
              ${index === 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''} 
              ${selectedValve?.id === valve.id ? 'bg-gray-300 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
              inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={() => handleSelectValve(valve)}
            >
              <span>{valve.description}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
